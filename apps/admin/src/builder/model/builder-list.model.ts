import { ObjectType } from '@nestjs/graphql';
import { BuilderModel } from './builder.model';
import { CursorPagination } from '../../common/pagination';

@ObjectType({
  description: 'Builder list model',
})
export class BuilderListModel extends CursorPagination(BuilderModel) {}

