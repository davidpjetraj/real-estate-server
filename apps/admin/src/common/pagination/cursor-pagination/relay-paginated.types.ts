import { Type } from '@nestjs/common';
import { Field, ObjectType } from '@nestjs/graphql';
import { Edge } from './edge.type';
import {
  ICursorPageInfo,
  ICursorPagination,
} from './interfaces/paginates.interface';

@ObjectType('RelayPageInfo', { isAbstract: true })
abstract class PageInfoType implements ICursorPageInfo {
  @Field(() => String, { nullable: true })
  public startCursor: string;

  @Field(() => String, { nullable: true })
  public endCursor: string;

  @Field(() => Boolean)
  public hasNextPage: boolean;

  @Field(() => Boolean)
  public hasPreviousPage: boolean;
}

export function CursorPagination<T>(
  classRef: Type<T>,
): Type<ICursorPagination<T>> {
  @ObjectType(`${classRef.name}RelayEdge`, { isAbstract: true })
  abstract class EdgeType extends Edge(classRef) {}

  @ObjectType({ isAbstract: true })
  abstract class CursorPaginationType implements ICursorPagination<T> {
    @Field(() => [EdgeType])
    public edges: EdgeType[];

    @Field(() => PageInfoType)
    public pageInfo: PageInfoType;
  }

  return CursorPaginationType as Type<ICursorPagination<T>>;
}
