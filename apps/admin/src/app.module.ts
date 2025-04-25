import { GraphQLModule } from '@nestjs/graphql';
import { Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { config } from './config';
import { GqlConfigService } from './graphql-config.service';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'libs/common/src/prisma';
import { TeamModule } from './team/team.module';
@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useClass: GqlConfigService,
    }),
    JwtModule.register({
      global: true,
      secret: config.jwt_secret,
      signOptions: { expiresIn: config.access_token_expires_in },
    }),
    AuthModule,
    TeamModule,
    PrismaModule,
  ],
})
export class AppModule { }

