import { ApolloServerPlugin, GraphQLRequestListener } from '@apollo/server';
import { logger } from 'libs/common/src/logger';
import { Plugin } from '@nestjs/apollo';

@Plugin()
export class LoggingPlugin implements ApolloServerPlugin {
  async requestDidStart(): Promise<GraphQLRequestListener<any>> {
    return {
      async didResolveOperation() {
        logger.log('Request resolved');
      },
      async didEncounterErrors(ctx) {
        if (ctx.errors) {
          logger.error(
            'Errors encountered',
            JSON.stringify({
              metadata: {
                error: ctx?.errors[0],
                cluster: process.env.CLUSTER_NAME || 'local',
                stack: ctx?.errors[0]?.stack?.toString(),
                user: ctx?.contextValue?.req?.user?.userID,
                query: ctx?.request?.query,
                variables: ctx?.request?.variables,
                device: ctx?.request?.http?.headers?.get('device'),
              },
            }),
          );
        }
      },
      async willSendResponse() {
        logger.log('Will send response');
      },
    };
  }
}

