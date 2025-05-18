import { Field, ObjectType } from '@nestjs/graphql';
import { CursorPagination } from '../../common/pagination';
import { PropertyModel } from './property.model';

@ObjectType()
export class PropertyListModel extends CursorPagination(PropertyModel) {
  @Field(() => String, { nullable: true })
  search?: string;
}
