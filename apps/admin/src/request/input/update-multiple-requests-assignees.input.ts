import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class UpdateMultipleRequestsAssigneesInput {
  @Field(() => [String])
  @IsNotEmpty()
  request_ids: string[];

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  assignee_id: string;
}
