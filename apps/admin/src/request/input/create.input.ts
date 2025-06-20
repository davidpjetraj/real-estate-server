import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateRequestInput {
  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  author_id?: string;
}

