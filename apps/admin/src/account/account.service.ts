import { Injectable } from '@nestjs/common';
import { PrismaService } from 'libs/common/src/prisma';
import { ChangeEmailInput, ChangePhoneInput, UpdateNameInput } from './input';
import { accountSelect } from './select';
import { AccountModel } from './model';
import { GraphQLError } from 'graphql';

@Injectable()
export class AccountService {
  constructor(private readonly prisma: PrismaService) {}

  async updateName(
    admin_id: string,
    input: UpdateNameInput,
  ): Promise<AccountModel> {
    try {
      const account = await this.prisma.admin.update({
        where: {
          id: admin_id,
          deleted: false,
          status: 'active',
        },
        data: {
          ...input,
          name: `${input.first_name} ${input.last_name}`,
        },
        select: accountSelect,
      });

      return account;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new GraphQLError('Të dhënat nuk u gjetën ose janë fshirë.');
      }

      throw new GraphQLError('Diçka shkoi keq gjatë përditësimit të emrit.');
    }
  }

  async changeEmail(
    admin_id: string,
    input: ChangeEmailInput,
  ): Promise<AccountModel> {
    try {
      const account = await this.prisma.admin.update({
        where: {
          id: admin_id,
          deleted: false,
          status: 'active',
        },
        data: {
          email: input.email,
        },
        select: accountSelect,
      });

      return account;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new GraphQLError('Të dhënat nuk u gjetën ose janë fshirë.');
      }
      if (error.code === 'P2002') {
        throw new GraphQLError(
          'Ky email është tashmë në përdorim. Ju lutem provoni një tjetër.',
        );
      }

      throw new GraphQLError('Diçka shkoi keq gjatë ndryshimit të email-it.');
    }
  }

  async changePhone(
    admin_id: string,
    input: ChangePhoneInput,
  ): Promise<AccountModel> {
    try {
      const account = await this.prisma.admin.update({
        where: {
          id: admin_id,
          deleted: false,
          status: 'active',
        },
        data: {
          phone: input.phone,
        },
        select: accountSelect,
      });

      return account;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new GraphQLError('Të dhënat nuk u gjetën ose janë fshirë.');
      }
      if (error.code === 'P2002') {
        throw new GraphQLError(
          'Ky numër telefoni është tashmë në përdorim. Ju lutem provoni një tjetër.',
        );
      }

      throw new GraphQLError(
        'Diçka shkoi keq gjatë ndryshimit të numrit të telefonit.',
      );
    }
  }
}

