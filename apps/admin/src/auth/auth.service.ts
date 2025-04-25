import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { hash, verify } from 'argon2';
import { GraphQLError } from 'graphql';
import { PrismaService } from 'libs/common/src/prisma';
import { config } from '../config';
import { AuthModel } from './model';
import { Prisma } from '@prisma/client';
import { createCipheriv, createDecipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';
import { accountSelect } from '../account/select';
import { JwtService } from '@nestjs/jwt';
import { RegisterInput } from './input';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) { }

  async login(email: string, password: string): Promise<string> {
    const user = await this.prisma.admin.findUnique({
      where: {
        email,
        status: 'active',
      },
      select: {
        id: true,
        password: true,
        first_name: true,
        email: true,
      },
    });

    if (!user) {
      throw new GraphQLError('Përdoruesi nuk u gjet');
    }

    const isPasswordValid = await verify(user.password, password);

    if (!isPasswordValid) {
      throw new GraphQLError('Fjalëkalimi i pavlefshëm');
    }

    const token = await this.generateJwtToken(
      { user: user.email },
      config.request_login_token_expires_in,
      config.jwt_secret,
    );

    return token;
  }

  async verifyLogin(token: string): Promise<AuthModel> {
    try {
      const { user } = await this.verifyJwtToken(
        token,
        config.jwt_secret,
        config.encryption_key,
      );

      const admin = await this.prisma.admin.findUnique({
        where: {
          email: user,
          status: 'active',
        },
        select: accountSelect,
      });

      if (!admin) {
        throw new GraphQLError('Përdoruesi nuk u gjett');
      }

      return await this.createSession(admin.id);
    } catch (error) {
      console.log('error', error);
      if (error instanceof GraphQLError) {
        throw error;
      } else {
        throw new UnauthorizedException('Token i pavlefshëm');
      }
    }
  }

  async register(registerInput: RegisterInput): Promise<AuthModel> {
    const { email, password, first_name, last_name, phone, birthday } =
      registerInput;

    const existingAdmin = await this.prisma.admin.findUnique({
      where: { email },
    });

    if (existingAdmin) {
      throw new BadRequestException('Email already in use');
    }

    const hashedPassword = await hash(password);

    const admin = await this.prisma.admin.create({
      data: {
        email,
        password: hashedPassword,
        first_name,
        last_name,
        name: `${first_name} ${last_name}`,
        phone,
        birthday,
        status: 'active',
      },
    });

    return this.createSession(admin.id);
  }

  async account(admin_id: string) {
    return await this.prisma.admin.findUnique({
      where: { id: admin_id },
      select: accountSelect,
    });
  }

  async logout(session_id: string, admin_id: string) {
    await this.prisma.adminSession.delete({
      where: {
        id: session_id,
        admin_id: admin_id,
      },
    });

    return true;
  }

  async checkSession(admin_id: string, session_id: string) {
    try {
      return await this.prisma.adminSession.findUniqueOrThrow({
        where: {
          id: session_id,
          admin: {
            id: admin_id,
          },
        },
        select: {
          id: true,
          admin: { select: accountSelect },
        },
      });
    } catch (error) {
      throw new UnauthorizedException(
        'Nuk keni autorizimin për të aksesuar këtë route',
      );
    }
  }

  async refreshToken(refreshToken: string): Promise<AuthModel> {
    const { admin_id, session_id } = await this.verifyJwtToken(
      refreshToken,
      config.jwt_secret,
      config.encryption_key,
    );

    const session = await this.prisma.adminSession.findUnique({
      where: {
        id: session_id,
      },
    });

    if (!session) {
      throw new BadRequestException('Token i pavlefshëm');
    }

    const isMatch = refreshToken === session?.refresh_token;

    if (isMatch) {
      const accessToken = await this.generateJwtToken(
        {
          session_id: session.id,
          admin_id,
        },
        config.access_token_expires_in,
        config.jwt_secret,
      );

      const refresh_token = await this.generateJwtToken(
        {
          session_id: session.id,
          admin_id,
        },
        config.refresh_token_expires_in,
        config.jwt_secret,
      );

      await this.prisma.adminSession.update({
        where: { id: session.id },
        data: { refresh_token: refresh_token },
      });

      return {
        access_token: accessToken,
        refresh_token: refresh_token,
      };
    } else {
      if (session == null) {
        throw new UnauthorizedException(
          'Nuk keni autorizimin për të aksesuar këtë route',
        );
      }

      if (admin_id !== session.admin_id) {
        await this.prisma.adminSession.deleteMany({
          where: {
            admin_id: admin_id,
          },
        });
        throw new UnauthorizedException(
          'Nuk lejohet të keni akses në këtë route',
        );
      }
      throw new UnauthorizedException('Diçka shkoi gabim');
    }
  }

  async destroySession(admin_id: string, current_session_id?: string) {
    const sessionToRemoveWhere: Prisma.AdminSessionWhereInput = {
      admin_id,
      ...(current_session_id && { id: { not: current_session_id } }),
    };

    await this.prisma.adminSession.deleteMany({
      where: sessionToRemoveWhere,
    });

    return;
  }

  async createSession(admin_id: string): Promise<AuthModel> {
    const session = await this.prisma.adminSession.create({
      data: {
        admin: {
          connect: {
            id: admin_id,
          },
        },
      },
    });

    const accessToken = await this.generateJwtToken(
      { session_id: session.id, admin_id: admin_id },
      config.access_token_expires_in,
      config.jwt_secret,
    );

    const refreshToken = await this.generateJwtToken(
      { session_id: session.id, admin_id: admin_id },
      config.refresh_token_expires_in,
      config.jwt_secret,
    );

    await this.prisma.adminSession.update({
      where: {
        id: session.id,
      },
      data: {
        refresh_token: refreshToken,
      },
    });

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async generateJwtToken(payload: any, expiresIn: string, secret: string) {
    const encryptPayload = await this.encryptData(
      JSON.stringify(payload),
      config.encryption_key,
    );

    const token = this.jwtService.sign(
      { data: encryptPayload },
      {
        expiresIn,
        secret,
      },
    );

    return token;
  }

  async verifyJwtToken(token: string, secret: string, hash: string) {
    try {
      const { data } = this.jwtService.verify(token, {
        secret,
      });

      const decryptedPayload = await this.decryptData(data, hash);

      return decryptedPayload;
    } catch (error) {
      throw new BadRequestException('Token i pavlefshëm');
    }
  }

  async encryptData(data: string, encryptionKey: string) {
    const iv = randomBytes(16);
    const hashedKey = (await promisify(scrypt)(
      encryptionKey,
      'salt',
      32,
    )) as Buffer;
    const cipher = createCipheriv('aes-256-ctr', hashedKey, iv);
    const encryptedText = Buffer.concat([
      cipher.update(data, 'utf8'),
      cipher.final(),
    ]);
    return `${iv.toString('hex')}:${encryptedText.toString('hex')}`;
  }

  async decryptData(encryptedData: string, decryptionKey: string) {
    try {
      const [iv, data] = encryptedData
        .split(':')
        .map((part) => Buffer.from(part, 'hex'));
      const key = (await promisify(scrypt)(
        decryptionKey,
        'salt',
        32,
      )) as Buffer;
      const decipher = createDecipheriv('aes-256-ctr', key, iv);
      const decryptedText = Buffer.concat([
        decipher.update(data),
        decipher.final(),
      ]);
      return JSON.parse(decryptedText.toString('utf-8'));
    } catch (error) {
      throw new BadRequestException('Token i pavlefshëm');
    }
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
