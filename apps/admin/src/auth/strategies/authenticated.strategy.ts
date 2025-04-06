import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';
import { Strategy as JStrategy } from 'passport-jwt';
import { config } from '../../config';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthenticatedStrategy extends PassportStrategy(JStrategy, 'jwt') {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.jwt_secret,
      passReqToCallback: true,
    });
  }

  async validate(req: any, payload: any): Promise<any> {
    const { admin_id, session_id } = await this.authService.decryptData(
      payload.data,
      config.encryption_key,
    );

    const session = await this.authService.checkSession(admin_id, session_id);

    // Set the session information on the request object
    req.admin = {
      admin_id: session.admin.id,
      session_id: session.id,
    };

    return req.admin;
  }
}

