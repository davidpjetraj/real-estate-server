import { InternalServerErrorException } from '@nestjs/common';
import { IEdge } from './interfaces/paginates.interface';

export async function createEdge<T>(
  instance: T,
  cursor: string,
): Promise<IEdge<T>> {
  try {
    return {
      node: instance,
      cursor: Buffer.from(cursor, 'utf-8').toString('base64'),
    };
  } catch (_) {
    throw new InternalServerErrorException('The given cursor is invalid');
  }
}
