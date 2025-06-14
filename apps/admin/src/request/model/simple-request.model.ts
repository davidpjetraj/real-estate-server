import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType({
  description: 'Simple Request Model',
})
export class SimpleRequestModel {
  @Field(() => ID)
  id: string;

  @Field(() => Int)
  short_id: number;

  @Field(() => String, { nullable: true })
  fullName: string;

  @Field(() => Int, { nullable: true })
  status: number;

  @Field(() => Boolean)
  deleted: boolean;

  @Field(() => Date)
  created_at: Date;
}
