import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class GetWithShortIdInput {
  @Field(() => Int)
  @IsNotEmpty()
  short_id: number;
}
