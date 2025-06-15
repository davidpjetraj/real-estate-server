import { Prisma } from '@prisma/client';
import { requestSelect } from '../request/select';
import { teamSelect } from '../team/select';

export const builderSelect: Prisma.BuilderSelect = {
  id: true,
  name: true,
  deleted: true,
  created_at: true,
  state: true,
  city: true,
  complexes: {
    select: {
      id: true,
      name: true,
      deleted: true,
      created_at: true,
    },
  },
  properties: {
    select: {
      id: true,
      short_id: true,
      title: true,
      status: true,
      created_at: true,
    },
  },
  requests: {
    select: requestSelect,
  },
  author: {
    select: teamSelect,
  },
};

export const simpleBuilderSelect: Prisma.BuilderSelect = {
  id: true,
  name: true,
  deleted: true,
  created_at: true,
  state: true,
  city: true,
};

