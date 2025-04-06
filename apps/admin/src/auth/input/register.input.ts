import { Field, InputType } from '@nestjs/graphql';
import { IsDate, IsEmail, IsOptional, IsString } from 'class-validator';

@InputType()
export class RegisterInput {
  @Field(() => String)
  @IsString()
  first_name: string;

  @Field(() => String)
  @IsString()
  last_name: string;

  @Field(() => String)
  @IsEmail()
  email: string;

  @Field(() => String)
  @IsString()
  password: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  phone?: string;

  @Field(() => Date, { nullable: true })
  @IsDate()
  @IsOptional()
  birthday: Date;
}

