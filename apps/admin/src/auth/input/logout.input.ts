import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType({
  description: 'Logout input',
})
export class LogoutInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  id: string;
}

