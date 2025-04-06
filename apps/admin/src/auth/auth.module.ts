import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { AuthenticatedGuard, LocalGuard } from '../guards';
import { AuthenticatedStrategy, LocalStrategy } from './strategies';

@Module({
  providers: [
    AuthService,
    AuthResolver,
    LocalGuard,
    AuthenticatedGuard,
    LocalStrategy,
    AuthenticatedStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
