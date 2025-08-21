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
  request_of_agent: string[];

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  assistant: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  budget_type: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  request_of: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  source: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  payment_method: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  client_type: string;

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
  building_constructor: string[];

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  surface_min: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  surface_max: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  floor_min: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  floor_max: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  rooms_min: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  rooms_max: number;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  heating_system: string[];

  @Field(() => [String], { nullable: true })
  @IsString()
  @IsOptional()
  documents: string[];

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  budget: number;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  request_for_properties: string[];

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  phone: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  message: string;
}

