import { Prisma } from '@prisma/client';
import { simpleBuilderSelect } from '../builder/select';
import { simpleRequestSelect } from '../request/select';
import { teamSelect } from '../team/select';

export const complexSelect: Prisma.ComplexSelect = {
  id: true,
  name: true,
  deleted: true,
  builder: {
    select: simpleBuilderSelect,
  },
  state: true,
  city: true,
  street: true,
  author: {
    select: teamSelect,
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
    select: simpleRequestSelect,
  },
  created_at: true,
};

export const complexSimpleSelect: Prisma.ComplexSelect = {
  id: true,
  name: true,
  deleted: true,
  created_at: true,
};

