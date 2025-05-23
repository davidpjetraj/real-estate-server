import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType({
  description: 'Get Property Input',
})
export class GetPropertyInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  id: string;
}

