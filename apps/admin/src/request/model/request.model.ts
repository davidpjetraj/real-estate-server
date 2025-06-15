import {
  Field,
  Float,
  ID,
  Int,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { BudgetType, RequestBuyType, RequestCreatedFrom } from '@prisma/client';
import { TeamModel } from '../../team/model';
import { SimpleClientModel } from '../../client/model';
import { SimplePropertyModel } from '../../property/model';

registerEnumType(RequestCreatedFrom, {
  name: 'RequestCreatedFrom',
  description: 'Enum for Request Creation Source',
});

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
  author_id: string;

  @Field(() => TeamModel, { nullable: true })
  author: TeamModel;

  @Field(() => SimpleClientModel, { nullable: true })
  client: SimpleClientModel;

  @Field(() => TeamModel, { nullable: true })
  assistant: TeamModel;

  @Field(() => String, { nullable: true })
  clientType: string;

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
  paymentMethod: string;

  @Field(() => String, { nullable: true })
  city: string;

  @Field(() => String, { nullable: true })
  assignee_id: string;

  @Field(() => TeamModel, { nullable: true })
  assignee: TeamModel;

  @Field(() => String, { nullable: true })
  street: string;

  @Field(() => [TeamModel], { nullable: true })
  requestOfAgent: TeamModel[];

  @Field(() => String, { nullable: true })
  requestOf: string;

  @Field(() => Int, { nullable: true })
  surfaceMin: number;

  @Field(() => Int, { nullable: true })
  surfaceMax: number;

  @Field(() => Float, { nullable: true })
  surfaceM2: number;

  @Field(() => String, { nullable: true })
  fullName: string;

  @Field(() => Int)
  status: number;

  @Field(() => String)
  buildingStatus: string;

  @Field(() => Int, { nullable: true })
  floorMin: number;

  @Field(() => Int, { nullable: true })
  floorMax: number;

  @Field(() => Int, { nullable: true })
  roomsMin: number;

  @Field(() => Int, { nullable: true })
  roomsMax: number;

  @Field(() => [String], { nullable: true })
  orientation: string[];

  @Field(() => [String], { nullable: true })
  furnishing: string[];

  @Field(() => [String], { nullable: true })
  heatingSystem: string[];

  @Field(() => [String], { nullable: true })
  others: string[];

  @Field(() => String, { nullable: true })
  otherDetails: string;

  @Field(() => String, { nullable: true })
  destination: string;

  @Field(() => Boolean, { nullable: true })
  possessionSheet: boolean;

  @Field(() => String, { nullable: true })
  phone: string;

  @Field(() => String, { nullable: true })
  message: string;

  @Field(() => RequestCreatedFrom, { nullable: true })
  createdFrom: RequestCreatedFrom;

  @Field(() => Boolean)
  deleted: boolean;

  @Field(() => Boolean, { nullable: true })
  buildingPermits: boolean;

  @Field(() => String, { nullable: true })
  documents: string;

  @Field(() => [String], { nullable: true })
  infrastructure: string[];

  @Field(() => Int)
  budget: number;

  @Field(() => Float)
  budgetFull: number;

  @Field(() => BudgetType)
  budgetType: BudgetType;

  @Field(() => Int, { nullable: true })
  matchingProperties: number;

  @Field(() => Int, { nullable: true })
  sortNumber: number;

  @Field(() => [SimplePropertyModel], { nullable: true })
  requestForProperties: SimplePropertyModel[];

  @Field(() => Boolean, { nullable: true })
  paid: boolean;

  @Field(() => Boolean, { nullable: true })
  isPaid: boolean;

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date)
  updated_at: Date;
}

