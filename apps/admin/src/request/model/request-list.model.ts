import { ObjectType } from '@nestjs/graphql';

import { RequestModel } from './request.model';
import { CursorPagination } from '../../common/pagination';

@ObjectType({
  description: 'Request List Model',
})
export class RequestListModel extends CursorPagination(RequestModel) {}

