import { Field, ID, ObjectType } from '@nestjs/graphql';
import { SimpleRequestModel } from '../../request/model';
import { SimplePropertyModel } from '../../property/model';
import { SimpleComplexModel } from '../../complex/model';
import { TeamModel } from '../../team/model';

@ObjectType({
  description: 'Builder Model',
})
export class BuilderModel {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  state: string;

  @Field(() => String, { nullable: true })
  city: string;

  @Field(() => [SimpleComplexModel], { nullable: true })
  complexes: SimpleComplexModel[];

  @Field(() => [SimplePropertyModel], { nullable: true })
  properties: SimplePropertyModel[];

  @Field(() => [SimpleRequestModel], { nullable: true })
  requests: SimpleRequestModel[];

  @Field(() => TeamModel)
  author: TeamModel;

  @Field(() => Boolean)
  deleted: boolean;

  @Field(() => Date)
  created_at: Date;
}

