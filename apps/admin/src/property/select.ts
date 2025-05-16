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
  numberOfFloors: true,
  numberOfBathRooms: true,
  numberOfBalconies: true,
  numberOfBedRooms: true,
  numberOfRooms: true,
  sellPrice: true,
  rentPrice: true,
  forRent: true,
  forSale: true,
  published: true,
  published_at: true,
  agent: {
    select: teamSelect,
  },
  deleted: true,
  created_at: true,
};

