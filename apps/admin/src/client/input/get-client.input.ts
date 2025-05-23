import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType({
  description: 'Get Client Input',
})
export class GetClientInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  id: string;
}

