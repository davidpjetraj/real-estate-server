import { Field, InputType, Int } from '@nestjs/graphql';
import { RequestBuyType } from '@prisma/client';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class RequestInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  id: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  client: string;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  agents: string[];

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsString({ each: true })
  requestOfAgent: string[];

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  assistant: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  budgetType: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  requestOf: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  source: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  paymentMethod: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  clientType: string;

  @Field(() => RequestBuyType, { nullable: true })
  @IsString()
  @IsOptional()
  type: RequestBuyType;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  category: string[];

  @Field(() => [String], { nullable: true })
  @IsOptional()
  city: string[];

  @Field(() => [String], { nullable: true })
  @IsOptional()
  street: string[];

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  state: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  assignee: string;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  buildingConstructor: string[];

  @Field(() => [String], { nullable: true })
  @IsOptional()
  builder: string[];

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  surfaceMin: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  surfaceMax: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  floorMin: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  floorMax: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  roomsMin: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  roomsMax: string;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  orientation: string[];

  @Field(() => [String], { nullable: true })
  @IsOptional()
  furnishing: string[];

  @Field(() => [String], { nullable: true })
  @IsOptional()
  heatingSystem: string[];

  @Field(() => [String], { nullable: true })
  @IsOptional()
  others: string[];

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  otherDetails: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  destination: string;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  possessionSheet: boolean;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  buildingPermits: boolean;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  buildingStatus: string[];

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  documents: string;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  infrastructure: string[];

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  parcelNumber: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  budget: number;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  requestForProperties: string[];

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  phone: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  message: string;
}

