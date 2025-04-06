import { GraphQLModule } from '@nestjs/graphql';
import { Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { config } from './config';
import { GqlConfigService } from './graphql-config.service';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'libs/common/src/prisma';
@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useClass: GqlConfigService,
    }),
    JwtModule.register({
      global: true,
    }),
    AuthModule,
    PrismaModule,
  ],
})
export class AppModule {}

