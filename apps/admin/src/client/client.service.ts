import { Injectable } from '@nestjs/common';
import { PrismaService } from 'libs/common/src/prisma';
import {
  CreateClientInput,
  GetClientInput,
  RemoveRestoreClientInput,
  UpdateClientInput,
} from './input';
import { clientSelect } from './select';
import * as argon2 from 'argon2';
import { GraphQLError } from 'graphql';
import { ClientModel } from './model';
import { Prisma } from '@prisma/client';
import { GetAllClientsInput } from './input/get-all.input';
import { extractFilters } from '../utils';
import { createEdge } from '../common/pagination';

@Injectable()
export class ClientService {
  constructor(private readonly prisma: PrismaService) {}

  async createClient(input: CreateClientInput) {
    try {
      const hashedPassword = await argon2.hash(input.password);

      const client = await this.prisma.client.create({
        data: {
          ...input,
          name: `${input.first_name} ${input.last_name}`,
          password: hashedPassword,
          status: 'invited',
        },
        select: clientSelect,
      });

      return client;
    } catch (error) {
      if (error.code === 'P2002') {
        throw new GraphQLError('Email-i është i zënë');
      }
      throw new GraphQLError('Diqka shkoi gabim!');
    }
  }

  async updateClient(input: UpdateClientInput): Promise<ClientModel> {
    try {
      const client = await this.prisma.client.update({
        where: {
          id: input.id,
          deleted: false,
        },
        data: {
          ...input,
          name: `${input.first_name} ${input.last_name}`,
        },
        select: clientSelect,
      });

      return client;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new GraphQLError('Të dhënat nuk u gjetën ose janë fshirë.');
      }
      if (error.code === 'P2002') {
        throw new GraphQLError('Email-i është i zënë');
      }
      throw new GraphQLError('Diqka shkoi gabim!');
    }
  }

  async findAll(query: GetAllClientsInput) {
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

      const allQuery: Prisma.ClientFindManyArgs = {
        where: extractFilters(defaultQuery, query.filters, []),
        select: clientSelect,
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

      const dataQuery = await this.prisma.client.findMany(allQuery);

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

  async findOne(input: GetClientInput): Promise<ClientModel> {
    const client = await this.prisma.client.findUnique({
      where: {
        id: input.id,
        deleted: false,
      },
      select: clientSelect,
    });

    return client;
  }

  async removeClient(input: RemoveRestoreClientInput) {
    try {
      await this.prisma.client.update({
        where: {
          id: input.id,
          deleted: false,
        },
        data: {
          deleted: true,
          status: 'deactivated',
        },
      });

      return true;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new GraphQLError('Të dhënat nuk u gjetën ose janë fshirë.');
      }

      throw new GraphQLError('Diçka shkoi gabim!');
    }
  }

  async restoreClient(input: RemoveRestoreClientInput) {
    try {
      await this.prisma.client.update({
        where: {
          id: input.id,
          status: 'deactivated',
          deleted: true,
        },
        data: {
          deleted: false,
          status: 'active',
        },
      });

      return true;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new GraphQLError('Të dhënat nuk u gjetën ose janë fshirë.');
      }

      throw new GraphQLError('Diçka shkoi gabim!');
    }
  }
}

