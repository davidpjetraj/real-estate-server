import { Field, ObjectType } from "@nestjs/graphql";
import { TeamModel } from "./team.model";
import { CursorPagination } from "../../common/pagination";



@ObjectType()
export class TeamListModel extends CursorPagination(TeamModel) {
  @Field(() => String, { nullable: true })
  search?: string;
}
