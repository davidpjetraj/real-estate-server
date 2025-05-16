import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType({
  description: 'Change Phone Input',
})
export class ChangePhoneInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  phone: string;
}

