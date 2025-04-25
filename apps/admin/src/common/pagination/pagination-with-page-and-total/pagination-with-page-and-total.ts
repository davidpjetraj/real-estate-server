import { Type } from '@nestjs/common';
import { Field, Int, ObjectType } from '@nestjs/graphql';

import { IPaginationWithPages, IPageInfo } from './interface';

@ObjectType('PageInfo', { isAbstract: true })
abstract class PageInfoType implements IPageInfo {
  @Field(() => Int)
  public pages: number;

  @Field(() => Int)
  public currentPage: number;

  @Field(() => Boolean)
  public hasNextPage: boolean;

  @Field(() => Boolean)
  public hasPreviousPage: boolean;
}

export function PaginationWithPages<T>(
  classRef: Type<T>,
): Type<IPaginationWithPages<T>> {
  @ObjectType({ isAbstract: true })
  abstract class PaginationWithPagesType implements IPaginationWithPages<T> {
    @Field(() => [classRef])
    public data: T[];

    @Field(() => Int)
    total: number;

    @Field(() => PageInfoType)
    public pageInfo: PageInfoType;
  }

  return PaginationWithPagesType as Type<IPaginationWithPages<T>>;
}
