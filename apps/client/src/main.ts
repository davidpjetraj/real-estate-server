import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { config } from './config';
import { ClientModule } from './client.module';

async function bootstrap() {
  const app = await NestFactory.create(ClientModule);

  app.enableCors();
  app.use(helmet());

  await app.listen(config.client_server_port, async () => {
    console.log(
      `${config.client_app_name}: Listening on ${await app.getUrl()}`,
    );
  });
}
bootstrap();
