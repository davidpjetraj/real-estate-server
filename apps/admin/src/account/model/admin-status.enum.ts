import { registerEnumType } from '@nestjs/graphql';
import { AdminStatus } from '@prisma/client';

registerEnumType(AdminStatus, {
  name: 'AdminStatus',
});

