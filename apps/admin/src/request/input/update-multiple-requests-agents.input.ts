import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateMultipleRequestAgentsInput {
  @Field(() => [String])
  @IsNotEmpty()
  request_ids: string[];

  @Field(() => [String])
  @IsNotEmpty()
  agents: string[];
}
