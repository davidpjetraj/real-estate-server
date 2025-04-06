import { Injectable } from '@nestjs/common';
import { GqlOptionsFactory } from '@nestjs/graphql';
import { ApolloDriverConfig } from '@nestjs/apollo';
import { DirectiveLocation, GraphQLDirective } from 'graphql';
const depthLimit = require('graphql-depth-limit');
import { LoggingPlugin } from './plugin/logging.plugin';

@Injectable()
export class GqlConfigService implements GqlOptionsFactory {
  createGqlOptions(): ApolloDriverConfig {
    return {
      autoSchemaFile:
        process.env.NODE_ENV === 'production'
          ? 'schema.gql'
          : 'apps/admin/src/schema.gql',
      playground: false,
      introspection: true,
      installSubscriptionHandlers: true,
      plugins: [new LoggingPlugin()],
      subscriptions: {
        'graphql-ws': {
          path: '/subscriptions',
        },
      },
      buildSchemaOptions: {
        directives: [
          new GraphQLDirective({
            name: 'upper',
            locations: [DirectiveLocation.FIELD_DEFINITION],
          }),
        ],
      },
      validationRules: [depthLimit(4)],
      context: ({ req, res }) => ({ req, res }),
    };
  }
}
