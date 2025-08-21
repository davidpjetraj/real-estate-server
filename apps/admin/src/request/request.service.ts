import { Injectable } from '@nestjs/common';
import { PrismaService } from 'libs/common/src/prisma';
import { requestSelect } from './select';
import {
  CreateRequestInput,
  GetAllRequestsInput,
  RequestInput,
  UpdateRequestAssigneeInput,
} from './input';
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
          { full_name: { contains: query.search, mode: 'insensitive' } },
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
      floor_min:
        typeof input.floor_min === 'string'
          ? parseInt(input.floor_min, 10)
          : input.floor_min, // Convert string to number
      floor_max:
        typeof input.floor_max === 'string'
          ? parseInt(input.floor_max, 10)
          : input.floor_max, // Convert string to number
      rooms_min:
        typeof input.rooms_min === 'string'
          ? parseInt(input.rooms_min, 10)
          : input.rooms_min, // Convert string to number
      rooms_max:
        typeof input.rooms_max === 'string'
          ? parseInt(input.rooms_max, 10)
          : input.rooms_max, // Convert string to number
      budget_type: input.budget_type as BudgetType, // Cast string to BudgetType enum
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
      building_constructor: input.building_constructor
        ? {
            set: input.building_constructor.map((id) => ({ id })),
          }
        : undefined,
      request_of_agent: input.request_of_agent
        ? {
            set: input.request_of_agent.map((id) => ({ id })),
          }
        : undefined,
      request_for_properties: input.request_for_properties
        ? {
            set: input.request_for_properties.map((id) => ({ id })),
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

  async remove(id: string, author: string): Promise<boolean> {
    try {
      const request = await this.prisma.request.update({
        where: {
          id: id,
          deleted: {
            not: true,
          },
        },
        data: {
          deleted: true,
        },
      });

      if (!request) {
        throw new GraphQLError('Kërkesa nuk u gjet');
      }

      return true;
    } catch (error) {
      console.log('error:', error);
      throw new GraphQLError('Kërkesa nuk u gjet');
    }
  }

  async updateRequestAssignee(input: UpdateRequestAssigneeInput) {
    try {
      const foundRequest = await this.prisma.request.findUnique({
        where: { id: input.id },
      });

      const request = await this.prisma.request.update({
        where: {
          id: foundRequest.id,
        },
        data: {
          assignee_id: input.assignee_id,
        },
        select: requestSelect,
      });

      return request;
    } catch (error) {
      console.log('error:', error);
      throw new GraphQLError('Kërkesa nuk u gjet');
    }
  }
}

