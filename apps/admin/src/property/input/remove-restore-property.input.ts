import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType({
  description: 'Remove & Restore Property Input',
})
export class RemoveRestorePropertyInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  id: string;
}

