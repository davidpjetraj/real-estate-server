import { Injectable } from '@nestjs/common';
import { PrismaService } from 'libs/common/src/prisma';
import { PropertyModel } from './model/property.model';
import {
  CreatePropertyInput,
  GetAllPropertiesInput,
  UpdatePropertyInput,
} from './input';
import { propertySelect } from './select';
import { GraphQLError } from 'graphql';
import { Prisma } from '@prisma/client';
import { extractFilters } from '../utils';
import { createEdge } from '../common/pagination';

@Injectable()
export class PropertyService {
  constructor(private readonly prisma: PrismaService) {}

  async createProperty(input: CreatePropertyInput): Promise<PropertyModel> {
    const agent = await this.prisma.admin.findUnique({
      where: {
        id: input.agent_id,
        status: 'active',
        deleted: false,
      },
    });

    if (!agent) {
      throw new GraphQLError('Agjenti nuk u gjet');
    }

    // Destructure agent_id out of input to avoid Prisma conflict
    const { agent_id, ...propertyData } = input;

    const property = await this.prisma.property.create({
      data: {
        ...propertyData,
        agent: {
          connect: { id: agent.id },
        },
      },
      select: propertySelect,
    });

    return property;
  }

  async updateProperty(input: UpdatePropertyInput): Promise<PropertyModel> {
    try {
      const property = await this.prisma.property.update({
        where: {
          id: input.id,
          status: 'active',
          deleted: false,
        },
        data: input,
        select: propertySelect,
      });
      return property;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new GraphQLError('Të dhënat nuk u gjetën ose janë fshirë.');
      }

      throw new GraphQLError('Diçka shkoi gabim!');
    }
  }

  async findAll(query: GetAllPropertiesInput) {
    try {
      const take = query?.limit || 20;

      const decodedCursor = query?.cursor
        ? Buffer.from(query.cursor, 'base64').toString('utf-8')
        : null;

      const defaultQuery: Prisma.PropertyWhereInput = query.search
        ? {
            OR: [
              { title: { contains: query.search, mode: 'insensitive' } },
              { description: { contains: query.search, mode: 'insensitive' } },
              { city: { contains: query.search, mode: 'insensitive' } },
            ],
          }
        : {};

      const allQuery: Prisma.PropertyFindManyArgs = {
        where: extractFilters(defaultQuery, query.filters, []),
        select: propertySelect,
        take: take + 1,
        orderBy: { created_at: 'desc' },
      };

      if (query?.cursor) {
        allQuery.cursor = { id: decodedCursor };
        allQuery.skip = 1;
      }

      if (query?.sort?.length > 0) {
        allQuery.orderBy = query.sort.reduce((acc: any, sort: any) => {
          acc.push({ [sort.id]: sort.value });
          return acc;
        }, []);
      } else {
        allQuery.orderBy = { created_at: 'desc' };
      }

      const dataQuery = await this.prisma.property.findMany(allQuery);

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
      console.log('error: ', error);
      throw new GraphQLError('Diqka shkoi gabim!');
    }
  }
}

