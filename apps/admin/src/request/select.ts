import { Prisma } from '@prisma/client';
import { teamSelect } from '../team/select';
import { simpleClientSelect } from '../client/select';

export const requestSelect: Prisma.RequestSelect = {
  id: true,
  short_id: true,
  author_id: true,
  author: {
    select: teamSelect,
  },
  client_id: true,
  client: {
    select: simpleClientSelect,
  },
  assistant_id: true,
  assistant: {
    select: teamSelect,
  },
  clientType: true,
  agents: {
    select: teamSelect,
  },
  type: true,
  category: true,
  state_id: true,
  state: true,
  source: true,
  paymentMethod: true,
  city: true,
  assignee_id: true,
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
  buildingConstructor: {
    select: {
      id: true,
      name: true,
    },
  },
  requestOfAgent: {
    select: teamSelect,
  },
  requestOf: true,
  surfaceMin: true,
  surfaceMax: true,
  surfaceM2Min: true,
  surfaceM2Max: true,
  fullName: true,
  status: true,
  buildingStatus: true,
  floorMin: true,
  floorMax: true,
  roomsMin: true,
  roomsMax: true,
  orientation: true,
  furnishing: true,
  heatingSystem: true,
  others: true,
  otherDetails: true,
  destination: true,
  possessionSheet: true,
  phone: true,
  message: true,
  createdFrom: true,
  deleted: true,
  buildingPermits: true,
  documents: true,
  infrastructure: true,
  budget: true,
  budgetFull: true,
  budgetType: true,
  matchingProperties: true,
  sortNumber: true,
  requestForProperties: {
    select: {
      id: true,
      title: true,
      sellPrice: true,
      rentPrice: true,
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
  fullName: true,
  status: true,
  deleted: true,
};

