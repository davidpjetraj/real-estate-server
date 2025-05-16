import { Field, InputType, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreatePropertyInput } from './create-property.input';

@InputType({
  description: 'Update Property Input',
})
export class UpdatePropertyInput extends PartialType(CreatePropertyInput) {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  id: string;
}

