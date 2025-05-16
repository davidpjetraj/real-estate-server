import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@InputType({
  description: 'Update Name Input',
})
export class UpdateNameInput {
  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  first_name: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  last_name: string;
}

