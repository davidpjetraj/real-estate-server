import { Prisma } from '@prisma/client';

export const accountSelect: Prisma.AdminSelect = {
  id: true,
  first_name: true,
  last_name: true,
  name: true,
  email: true,
  phone: true,
  birthday: true,
  status: true,
  deleted: true,
};

