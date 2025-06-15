import { BadRequestException, Injectable } from '@nestjs/common';
import { builderSelect } from './select';
import {
  CreateBuilderInput,
  GetAllBuildersInput,
  UpdateBuilderInput,
} from './input';
import { BuilderModel } from './model';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'libs/common/src/prisma';
import { GraphQLError } from 'graphql';

// Helper function for text search
const getTextSearch = (text: string): string => {
  return text
    .trim()
    .split(/\s+/)
    .map((word) => `${word}:*`)
    .join(' & ');
};

@Injectable()
export class BuilderService {
  constructor(private prisma: PrismaService) {}

  async createBuilder(author_id: string, input: CreateBuilderInput) {
    const builder = await this.prisma.builder.create({
      data: {
        name: input.name,
        author: {
          connect: {
            id: author_id,
          },
        },
      },
      select: builderSelect,
    });

    if (!builder) {
      throw new GraphQLError('Diçka shkoi gabim');
    }

    return builder;
  }

  async getAll(query: GetAllBuildersInput): Promise<BuilderModel[]> {
    const defaultQuery: Prisma.BuilderWhereInput = {
      deleted: false,
    };

    if (query.search) {
      defaultQuery.OR = [
        { name: { contains: query.search, mode: 'insensitive' } },
      ];
    }

    return await this.prisma.builder.findMany({
      where: defaultQuery,
      select: builderSelect,
    });
  }

  async getAllBuildersList(
    query: GetAllBuildersInput,
  ): Promise<BuilderModel[]> {
    const defaultQuery: Prisma.BuilderWhereInput = {
      deleted: false,
    };

    if (query.search) {
      defaultQuery.OR = [
        { name: { contains: query.search, mode: 'insensitive' } },
      ];
    }

    // if (query?.sort?.length > 0) {
    //   const toSort = [...query.sort];
    //   if (!query.sort.find((item) => item.id === 'created_at')) {
    //     toSort.push({ id: 'created_at', value: 'desc' });
    //   }

    //   queryData.orderBy = toSort.map((item: any) => {
    //     return {
    //       [item.id]: item.value,
    //     };
    //   });
    // } else {
    //   queryData.orderBy = { created_at: 'desc' }; // default orderBy value
    // }

    return await this.prisma.builder.findMany({
      where: defaultQuery,
      select: builderSelect,
    });
  }

  async getBuilder(id: string) {
    const builder = await this.prisma.builder.findUnique({
      where: { id: id, deleted: false },
      select: builderSelect,
    });

    if (!builder) {
      throw new GraphQLError('Ndërtuesi nuk u gjet');
    }

    return builder;
  }

  async updateBuilder(input: UpdateBuilderInput) {
    try {
      const builder = await this.prisma.builder.update({
        where: { id: input.id, deleted: false },
        data: input,
        select: builderSelect,
      });

      if (!builder) {
        throw new GraphQLError('Ndërtuesi nuk u gjet');
      }

      return builder;
    } catch (error) {
      throw new BadRequestException(error?.meta?.cause);
    }
  }

  async deleteBuilder(id: string) {
    try {
      const builder = await this.prisma.builder.update({
        where: { id: id },
        data: { deleted: true },
      });

      if (!builder) {
        throw new GraphQLError('Ndërtuesi nuk u gjet');
      }

      return true;
    } catch (error) {
      throw new BadRequestException(error?.meta?.cause);
    }
  }
}

