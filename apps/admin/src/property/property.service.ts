import { Injectable } from '@nestjs/common';
import { PrismaService } from 'libs/common/src/prisma';
import { PropertyModel } from './model/property.model';
import { CreatePropertyInput, UpdatePropertyInput } from './input';
import { propertySelect } from './select';
import { GraphQLError } from 'graphql';

@Injectable()
export class PropertyService {
  constructor(private readonly prisma: PrismaService) {}

  async createProperty(input: CreatePropertyInput): Promise<PropertyModel> {
    const property = await this.prisma.property.create({
      data: input,
      select: propertySelect,
    });

    return property;
  }

  async updateProperty(
    id: string,
    input: UpdatePropertyInput,
  ): Promise<PropertyModel> {
    try {
      const property = await this.prisma.property.update({
        where: {
          id,
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
}

