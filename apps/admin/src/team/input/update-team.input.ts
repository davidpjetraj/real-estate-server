import { Field, ID, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
@InputType()
export class UpdateTeamInput {
  @Field(() => ID)
  @IsNotEmpty()
  @IsString()
  id: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  first_name: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  last_name: string;

  @Field(() => Date, { nullable: true })
  @IsOptional()
  birthday: Date;
}