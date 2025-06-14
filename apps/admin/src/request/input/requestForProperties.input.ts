import { Field, InputType } from '@nestjs/graphql';
import { RequestCreatedFrom } from '@prisma/client';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class RequestForPropertiesInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  phone: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  message: string;

  @Field(() => RequestCreatedFrom, { nullable: true })
  @IsString()
  @IsOptional()
  createdFrom: RequestCreatedFrom;

  @Field(() => [String])
  @IsNotEmpty()
  properties: string[];
}

