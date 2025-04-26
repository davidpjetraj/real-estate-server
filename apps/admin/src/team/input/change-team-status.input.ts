import { Field, ID, InputType } from "@nestjs/graphql";
import { AdminStatus } from "@prisma/client";
import { IsNotEmpty } from "class-validator";

@InputType()
export class ChangeTeamStatusInput {
  @Field(() => ID)
  @IsNotEmpty()
  id: string

  @Field(() => AdminStatus)
  status: AdminStatus

  @Field(() => Boolean)
  deleted: boolean



}