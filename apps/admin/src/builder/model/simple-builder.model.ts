import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({
  description: 'Simple Builder Model',
})
export class SimpleBuilderModel {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => Boolean)
  deleted: boolean;

  @Field(() => Date)
  created_at: Date;
}
