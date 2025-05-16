import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType({
  description: 'Change Email Input',
})
export class ChangeEmailInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  email: string;
}

