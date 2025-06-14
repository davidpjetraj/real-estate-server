import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateRequestAssigneeInput {
  @Field(() => String, { nullable: true })
  @IsNotEmpty()
  @IsString()
  request_id: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  user: string;
}
