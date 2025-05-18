import { Field, InputType } from '@nestjs/graphql';
import { CursorPaginationArgs } from 'apps/admin/src/common/GetAll';

@InputType({ description: 'Get All Properties Input' })
export class GetAllPropertiesInput extends CursorPaginationArgs {
  @Field(() => String, { nullable: true })
  search: string;
}
