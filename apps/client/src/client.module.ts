import { Module } from '@nestjs/common';
import { PrismaModule } from 'libs/common/src/prisma';

@Module({
  imports: [PrismaModule],
})
export class ClientModule {}
