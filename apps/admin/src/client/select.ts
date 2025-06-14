import { Prisma } from '@prisma/client';
import { propertySelect } from '../property/select';

export const clientSelect: Prisma.ClientSelect = {
  id: true,
  first_name: true,
  last_name: true,
  name: true,
  email: true,
  phone: true,
  birthday: true,
  status: true,
  state: true,
  city: true,
  address: true,
  properties: {
    select: propertySelect,
  },
  deleted: true,
  created_at: true,
};

export const simpleClientSelect: Prisma.ClientSelect = {
  id: true,
  first_name: true,
  last_name: true,
  name: true,
  email: true,
  phone: true,
  birthday: true,
  status: true,
  state: true,
  city: true,
  address: true,
  deleted: true,
  created_at: true,
};

