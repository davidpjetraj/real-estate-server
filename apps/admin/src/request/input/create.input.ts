import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateRequestInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  title: string;
}

