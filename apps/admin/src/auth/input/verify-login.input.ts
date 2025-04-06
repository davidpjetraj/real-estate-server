import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType({
  description: 'Verify login input',
})
export class VerifyLoginInput {
  @Field(() => String, { description: 'Verify Token' })
  @IsNotEmpty()
  @IsString()
  token: string;
}

