import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class GetByIdInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  id: string;
}
