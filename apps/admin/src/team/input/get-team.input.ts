import { Field, ID, InputType } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@InputType()
export class GetTeamByIDInput {
  @Field(() => ID)
  @IsNotEmpty()
  id: string

}