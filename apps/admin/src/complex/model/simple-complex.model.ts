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

  // @Field(() => BuilderModel, { nullable: true })
  // builder: BuilderModel;

  // @Field(() => Simpl, { nullable: true })
  // city: CityModel;

  // @Field(() => StreetModel, { nullable: true })
  // street: StreetModel;

  // @Field(() => StateModel, { nullable: true })
  // state: StateModel;

  // @Field(() => CompanyModel, { nullable: true })
  // company: CompanyModel;

  @Field(() => Date)
  created_at: Date;
}
