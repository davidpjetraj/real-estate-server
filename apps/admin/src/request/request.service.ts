import { Injectable } from '@nestjs/common';
import { PrismaService } from 'libs/common/src/prisma';
import { requestSelect } from './select';
import { CreateRequestInput, GetAllRequestsInput, RequestInput } from './input';
import { GraphQLError } from 'graphql';
import { createEdge } from '../common/pagination';
import { Prisma } from '@prisma/client';
import { extractFilters } from '../utils';
import { RequestListModel } from './model';
import { BudgetType } from '@prisma/client';

@Injectable()
export class RequestService {
  constructor(private readonly prisma: PrismaService) {}

  async create(author: string, input: CreateRequestInput) {
    const data: any = input;
    data.author_id = author;

    const request = await this.prisma.request.create({
      data: data,
      select: requestSelect,
    });

    return request;
  }

  async findAll(
    userId: string,
    query: GetAllRequestsInput,
  ): Promise<RequestListModel> {
    try {
      const take = 50;

      const decodedCursor = query?.cursor
        ? Buffer.from(query.cursor, 'base64').toString('utf-8')
        : null;

      const defaultQuery: Prisma.RequestWhereInput = {
        deleted: false,
      };

      if (query.search) {
        defaultQuery.OR = [
          { fullName: { contains: query.search, mode: 'insensitive' } },
        ];
      }

      const allQuery: Prisma.RequestFindManyArgs = {
        where: extractFilters(defaultQuery, query.filters, []),
        select: requestSelect,
        take: take + 1,
        orderBy: { created_at: 'desc' },
      };

      const dataQuery = await this.prisma.request.findMany(allQuery);

      const hasNextPage = dataQuery.length > take;

      if (hasNextPage) {
        dataQuery.pop();
      }

      const nodes = dataQuery;

      const edges = await Promise.all(
        nodes.map((node: any) => createEdge(node, node.id)),
      );

      const hasPreviousPage = !!decodedCursor;

      return {
        edges,
        pageInfo: {
          startCursor: edges[0]?.cursor || null,
          endCursor: edges[edges.length - 1]?.cursor || null,
          hasNextPage,
          hasPreviousPage,
        },
      };
    } catch (error) {
      console.error('Error:', error);
      throw new GraphQLError('Something went wrong!');
    }
  }

  async findOne(id: string, userId: string) {
    const request = await this.prisma.request.findUnique({
      where: {
        id: id,
      },
      select: requestSelect,
    });

    if (!request) {
      throw new GraphQLError('Kërkesa nuk u gjet');
    }

    return request;
  }

  async update(input: RequestInput, author: string) {
    const findRequest = await this.prisma.request.findUnique({
      where: {
        id: input.id,
        deleted: false,
      },
      include: {
        assignee: true,
      },
    });

    if (!findRequest) {
      throw new GraphQLError('Kërkesa nuk u gjet');
    }

    const updateData: Prisma.RequestUpdateInput = {
      ...input,
      city: Array.isArray(input.city) ? input.city.join(', ') : input.city, // Convert string[] to string
      street: Array.isArray(input.street)
        ? input.street.join(', ')
        : input.street, // Convert string[] to string
      buildingStatus: Array.isArray(input.buildingStatus)
        ? input.buildingStatus.join(', ')
        : input.buildingStatus, // Convert string[] to string
      floorMin:
        typeof input.floorMin === 'string'
          ? parseInt(input.floorMin, 10)
          : input.floorMin, // Convert string to number
      floorMax:
        typeof input.floorMax === 'string'
          ? parseInt(input.floorMax, 10)
          : input.floorMax, // Convert string to number
      roomsMin:
        typeof input.roomsMin === 'string'
          ? parseInt(input.roomsMin, 10)
          : input.roomsMin, // Convert string to number
      roomsMax:
        typeof input.roomsMax === 'string'
          ? parseInt(input.roomsMax, 10)
          : input.roomsMax, // Convert string to number
      budgetType: input.budgetType as BudgetType, // Cast string to BudgetType enum
      client: input.client
        ? {
            connect: { id: input.client },
          }
        : undefined,
      assistant: input.assistant
        ? {
            connect: { id: input.assistant },
          }
        : undefined,
      agents: input.agents
        ? {
            set: input.agents.map((id) => ({ id })),
          }
        : undefined,
      assignee: input.assignee
        ? {
            connect: { id: input.assignee },
          }
        : undefined,
      builder: input.builder
        ? {
            set: input.builder.map((id) => ({ id })),
          }
        : undefined,
      buildingConstructor: input.buildingConstructor
        ? {
            set: input.buildingConstructor.map((id) => ({ id })),
          }
        : undefined,
      requestOfAgent: input.requestOfAgent
        ? {
            set: input.requestOfAgent.map((id) => ({ id })),
          }
        : undefined,
      requestForProperties: input.requestForProperties
        ? {
            set: input.requestForProperties.map((id) => ({ id })),
          }
        : undefined,
    };

    const request = await this.prisma.request.update({
      where: { id: input.id },
      data: updateData,
      select: requestSelect,
    });

    return request;
  }
}

