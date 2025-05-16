import { Field, Float, InputType, Int } from '@nestjs/graphql';
import { PropertyCategory } from '@prisma/client';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType({
  description: 'Create Property Input',
})
export class CreatePropertyInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  title: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  description: string;

  @Field(() => PropertyCategory)
  @IsNotEmpty()
  category: PropertyCategory;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  state: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  city: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  address: string;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  surface: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  numberOfFloors: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  buildingYear: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  numberOfRooms: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  numberOfBathRooms: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  numberOfBedRooms: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  numberOfBalconies: number;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  sellPrice: number;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  rentPrice: number;

  @Field(() => Boolean)
  @IsNotEmpty()
  forSale: boolean;

  @Field(() => Boolean)
  @IsNotEmpty()
  forRent: boolean;

  @Field(() => Boolean)
  @IsOptional()
  published: boolean;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  agent_id: string;
}

