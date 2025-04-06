import {
  ExecutionContext,
  UnauthorizedException,
  createParamDecorator,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

type IDType = 'admin_id' | 'session_id';

export interface ISession {
  admin_id: string;
  session_id: string;
}

export const SessionDecorator = createParamDecorator(
  (data: IDType, context: ExecutionContext): ISession | string => {
    const ctx = GqlExecutionContext.create(context);
    const session = ctx.getContext().req.admin;

    if (!session) {
      throw new UnauthorizedException('Unauthorized');
    }

    if (data) {
      return session?.[data] as string;
    } else {
      return session;
    }
  },
);

export const SessionDecoratorRest = createParamDecorator(
  (data: IDType, context: ExecutionContext): ISession | string => {
    const request = context.switchToHttp().getRequest();

    const session = request.admin;

    if (!session) {
      throw new UnauthorizedException('Unauthorized');
    }

    if (data) {
      return session?.[data] as string;
    } else {
      return session;
    }
  },
);

export const SocketSessionDecorator = createParamDecorator(
  (data: IDType, context: ExecutionContext): ISession | string => {
    const ctx = GqlExecutionContext.create(context);

    const session = ctx.getContext().req?.extra?.admin;

    if (!session) {
      throw new UnauthorizedException('Unauthorized');
    }

    if (data) {
      return session?.[data] as string;
    } else {
      return session;
    }
  },
);
