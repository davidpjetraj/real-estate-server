import { Prisma } from '@prisma/client';
import { teamSelect } from '../team/select';
import { simpleClientSelect } from '../client/select';

export const requestSelect: Prisma.RequestSelect = {
  id: true,
  short_id: true,
  author: {
    select: teamSelect,
  },
  client: {
    select: simpleClientSelect,
  },
  assistant: {
    select: teamSelect,
  },
  client_type: true,
  agents: {
    select: teamSelect,
  },
  type: true,
  category: true,
  state_id: true,
  state: true,
  source: true,
  payment_method: true,
  city: true,
  assignee: {
    select: teamSelect,
  },
  street: true,
  builder: {
    select: {
      id: true,
      name: true,
    },
  },
  building_constructor: {
    select: {
      id: true,
      name: true,
    },
  },
  request_of_agent: {
    select: teamSelect,
  },
  request_of: true,
  surface_min: true,
  surface_max: true,
  surface_m2: true,
  full_name: true,
  status: true,
  floor_min: true,
  floor_max: true,
  rooms_min: true,
  rooms_max: true,
  heating_system: true,
  phone: true,
  message: true,
  deleted: true,
  documents: true,
  budget: true,
  budget_full: true,
  budget_type: true,
  request_for_properties: {
    select: {
      id: true,
      title: true,
      sell_price: true,
      rent_price: true,
    },
  },
  paid: true,
  isPaid: true,
  created_at: true,
  updated_at: true,
};

export const simpleRequestSelect: Prisma.RequestSelect = {
  id: true,
  short_id: true,
  full_name: true,
  status: true,
  deleted: true,
};

