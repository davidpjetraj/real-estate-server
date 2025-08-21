import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({
  description: 'Simple Complex Model',
})
export class SimpleComplexModel {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => Boolean)
  deleted: boolean;

  @Field(() => Date)
  created_at: Date;
}

