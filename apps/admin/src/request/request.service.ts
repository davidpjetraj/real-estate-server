import { Injectable } from '@nestjs/common';
import { PrismaService } from 'libs/common/src/prisma';
import { requestSelect } from './select';
import { CreateRequestInput } from './input';

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
}

