import {
  Field,
  Float,
  ID,
  Int,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { BudgetType, RequestBuyType } from '@prisma/client';
import { TeamModel } from '../../team/model';
import { SimpleClientModel } from '../../client/model';
import { SimplePropertyModel } from '../../property/model';

registerEnumType(BudgetType, {
  name: 'BudgetType',
  description: 'Enum for Budget Type',
});

registerEnumType(RequestBuyType, {
  name: 'RequestBuyType',
  description: 'Request Buy Type',
});
@ObjectType({
  description: 'Request Model',
})
export class RequestModel {
  @Field(() => ID)
  id: string;

  @Field(() => Int)
  short_id: number;

  @Field(() => String, { nullable: true })
  full_name: string;

  @Field(() => TeamModel)
  author: TeamModel;

  @Field(() => SimpleClientModel, { nullable: true })
  client: SimpleClientModel;

  @Field(() => TeamModel, { nullable: true })
  assistant: TeamModel;

  @Field(() => String, { nullable: true })
  client_type: string;

  @Field(() => [TeamModel], { nullable: true })
  agents: TeamModel[];

  @Field(() => RequestBuyType, { nullable: true })
  type: RequestBuyType;

  @Field(() => [String], { nullable: true })
  category: string[];

  @Field(() => String, { nullable: true })
  state: string;

  @Field(() => String, { nullable: true })
  source: string;

  @Field(() => String, { nullable: true })
  payment_method: string;

  @Field(() => String, { nullable: true })
  city: string;

  @Field(() => TeamModel, { nullable: true })
  assignee: TeamModel;

  @Field(() => String, { nullable: true })
  street: string;

  @Field(() => [TeamModel], { nullable: true })
  request_of_agent: TeamModel[];

  @Field(() => String, { nullable: true })
  request_of: string;

  @Field(() => Int, { nullable: true })
  surface_min: number;

  @Field(() => Int, { nullable: true })
  surface_max: number;

  @Field(() => Float, { nullable: true })
  surface_m2: number;

  @Field(() => Int)
  status: number;

  @Field(() => Int, { nullable: true })
  floor_min: number;

  @Field(() => Int, { nullable: true })
  floor_max: number;

  @Field(() => Int, { nullable: true })
  rooms_min: number;

  @Field(() => Int, { nullable: true })
  rooms_max: number;

  @Field(() => String, { nullable: true })
  phone: string;

  @Field(() => String, { nullable: true })
  message: string;

  @Field(() => Boolean)
  deleted: boolean;

  @Field(() => [String], { nullable: true })
  documents: string[];

  @Field(() => Int)
  budget: number;

  @Field(() => Float)
  budget_full: number;

  @Field(() => BudgetType)
  budget_type: BudgetType;

  @Field(() => [SimplePropertyModel], { nullable: true })
  request_for_properties: SimplePropertyModel[];

  @Field(() => Boolean, { nullable: true })
  paid: boolean;

  @Field(() => Boolean, { nullable: true })
  isPaid: boolean;

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date)
  updated_at: Date;
}

