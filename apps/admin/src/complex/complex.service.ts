import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { complexSelect } from './select';
import {
  CreateComplexInput,
  GetAllComplexInput,
  UpdateComplexInput,
} from './input';
import { ComplexModel } from './model';
import { PrismaService } from 'libs/common/src/prisma';
import { Prisma } from '@prisma/client';

@Injectable()
export class ComplexService {
  constructor(private prisma: PrismaService) {}

  async create(input: CreateComplexInput, author_id: string) {
    const complex = await this.prisma.complex.create({
      data: {
        name: input.name,
        builder: {
          connect: { id: input.builder_id },
        },

        author: {
          connect: { id: author_id },
        },
      },
      select: complexSelect,
    });

    if (!complex) {
      throw new InternalServerErrorException('Diçka shkoi gabim');
    }

    return complex;
  }

  async getAll(query: GetAllComplexInput): Promise<ComplexModel[]> {
    const defaultQuery: Prisma.ComplexWhereInput = {
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
    return await this.prisma.complex.findMany({
      where: defaultQuery,
      select: complexSelect,
    });
  }

  async getAllComplexesList(
    query: GetAllComplexInput,
  ): Promise<ComplexModel[]> {
    const defaultQuery: Prisma.ComplexWhereInput = {
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
    return await this.prisma.complex.findMany({
      where: defaultQuery,
      select: complexSelect,
    });
  }

  async findOne(id: string) {
    const complex = await this.prisma.complex.findUnique({
      where: { id: id },
      select: complexSelect,
    });

    if (!complex) {
      throw new NotFoundException('Kompleksi nuk u gjet');
    }

    return complex;
  }

  async updateComplex(input: UpdateComplexInput) {
    const complex = await this.prisma.complex.update({
      where: { id: input.id },
      data: input,
      select: complexSelect,
    });

    if (!complex) {
      throw new NotFoundException('Kompleksi nuk u gjet');
    }

    return complex;
  }

  async deleteComplex(id: string) {
    const complex = await this.prisma.complex.delete({
      where: { id: id },
    });

    if (!complex) {
      throw new NotFoundException('Kompleksi nuk u gjet');
    }

    return true;
  }
}

