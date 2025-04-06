import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AuthenticatedGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;

    if (!request.headers.authorization) {
      throw new UnauthorizedException('Authorization token not provided');
    }

    return request;
  }
}

@Injectable()
export class AuthenticatedGuardRest extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    // Check for the authorization header
    if (!request.headers.authorization) {
      throw new UnauthorizedException('Authorization token not provided');
    }

    return request;
  }
}
