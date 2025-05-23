import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType({
  description: 'Remove & Restore Client Input',
})
export class RemoveRestoreClientInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  id: string;
}

