import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateComplexInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  builder_id: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  city_id: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  state_id: string;

  @Field(() => String)
  @IsString()
  @IsOptional()
  street_id: string;
}
