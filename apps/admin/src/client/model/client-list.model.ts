import { Field, ObjectType } from '@nestjs/graphql';
import { CursorPagination } from '../../common/pagination';
import { ClientModel } from './client.model';

@ObjectType()
export class ClientListModel extends CursorPagination(ClientModel) {
  @Field(() => String, { nullable: true })
  search?: string;
}
