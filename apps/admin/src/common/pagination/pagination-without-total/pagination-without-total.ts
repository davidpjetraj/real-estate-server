import { Field, ObjectType } from '@nestjs/graphql';
import { Type } from '@nestjs/common';

export interface IPaginatedTypeWithoutTotal<T> {
  data: T[];
  hasNextPage: boolean;
}

export function PaginationWithoutTotal<T>(
  classRef: Type<T>,
): Type<IPaginatedTypeWithoutTotal<T>> {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedType implements IPaginatedTypeWithoutTotal<T> {
    @Field(() => [classRef], { nullable: true })
    data: T[];

    @Field()
    hasNextPage: boolean;
  }

  return PaginatedType as Type<IPaginatedTypeWithoutTotal<T>>;
}
