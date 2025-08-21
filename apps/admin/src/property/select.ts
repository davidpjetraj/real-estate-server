import { Prisma } from '@prisma/client';
import { teamSelect } from '../team/select';

export const propertySelect: Prisma.PropertySelect = {
  id: true,
  short_id: true,
  title: true,
  description: true,
  category: true,
  state: true,
  city: true,
  address: true,
  status: true,
  surface: true,
  floor: true,
  number_of_floors: true,
  number_of_bathrooms: true,
  number_of_balconies: true,
  number_of_bedrooms: true,
  number_of_rooms: true,
  sell_price: true,
  rent_price: true,
  for_rent: true,
  for_sale: true,
  published: true,
  published_at: true,
  agent: {
    select: teamSelect,
  },
  deleted: true,
  created_at: true,
};

