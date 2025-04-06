require('dotenv').config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { config } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.use(helmet());

  await app.listen(config.admin_server_port, async () => {
    console.log(`${config.app_name}: Listening on ${await app.getUrl()}`);
  });
}
bootstrap();

