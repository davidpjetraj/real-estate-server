import { Field, InputType } from '@nestjs/graphql';
import { CursorPaginationArgs } from 'apps/admin/src/common/GetAll';

@InputType({ description: 'Get All Teams Input' })
export class GetAllTeamsInput extends CursorPaginationArgs {
  @Field(() => String, { nullable: true })
  search: string;
}
