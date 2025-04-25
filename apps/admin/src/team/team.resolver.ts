import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { TeamService } from "./team.service";
import { CreateTeamInput } from "./input";
import { TeamModel } from "./model";
import { TeamListModel } from "./model/team-list.model";
import { GetAllTeamsInput } from "./input/get-all.input";

@Resolver()
export class TeamResolver {
  constructor(private readonly teamService: TeamService) { }

  @Mutation(() => TeamModel)
  async createTeam(@Args('input') input: CreateTeamInput) {
    return this.teamService.createTeam(input);
  }

  @Query(() => TeamListModel)
  async getTeams(@Args('input') input: GetAllTeamsInput) {
    return this.teamService.findAll(input);
  }
}

