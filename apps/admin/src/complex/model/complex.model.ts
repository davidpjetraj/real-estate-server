import { Field, ID, ObjectType } from '@nestjs/graphql';
import { SimpleBuilderModel } from '../../builder/model';
import { TeamModel } from '../../team/model';
@ObjectType({
  description: 'Complex Model',
})
export class ComplexModel {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => Boolean)
  deleted: boolean;

  @Field(() => SimpleBuilderModel, { nullable: true })
  builder: SimpleBuilderModel;

  @Field(() => String, { nullable: true })
  city: string;

  @Field(() => String, { nullable: true })
  state: string;

  @Field(() => TeamModel)
  author: TeamModel;

  @Field(() => Date)
  created_at: Date;
}

