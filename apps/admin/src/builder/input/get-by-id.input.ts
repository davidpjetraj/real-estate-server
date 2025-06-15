import { IsNotEmpty, IsString } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class GetBuilderByIdInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  id: string;
}
