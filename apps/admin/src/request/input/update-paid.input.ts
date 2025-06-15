import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class UpdatePaidInput {
  @Field(() => String)
  @IsNotEmpty()
  id: string;
}

