import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateBuilderInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  id: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  name: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  city_id: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  state_id: string;
}
