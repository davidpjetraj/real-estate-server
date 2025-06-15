import { CreateComplexInput } from './create.input';
import { IsNotEmpty, IsString } from 'class-validator';
import { Field, InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateComplexInput extends PartialType(CreateComplexInput) {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  id: string;
}

