import { Field, InputType } from '@nestjs/graphql';
import { CursorPaginationArgs } from 'apps/admin/src/common/GetAll';

@InputType({ description: 'Get All Clients Input' })
export class GetAllClientsInput extends CursorPaginationArgs {
  @Field(() => String, { nullable: true })
  search: string;
}
