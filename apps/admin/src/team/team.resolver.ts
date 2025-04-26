import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { TeamService } from "./team.service";
import { ChangeTeamStatusInput, CreateTeamInput, GetTeamByIDInput } from "./input";
import { TeamModel } from "./model";
import { TeamListModel } from "./model/team-list.model";
import { GetAllTeamsInput } from "./input/get-all.input";
import { UpdateTeamInput } from './input/update-team.input';

@Resolver()
export class TeamResolver {
  constructor(private readonly teamService: TeamService) { }

  @Mutation(() => TeamModel)
  async createTeam(@Args('input') input: CreateTeamInput): Promise<TeamModel> {
    return this.teamService.createTeam(input);
  }

  @Mutation(() => TeamModel)
  async UpdateTeam(@Args('input') input: UpdateTeamInput): Promise<TeamModel> {
    return this.teamService.updateTeam(input);
  }

  @Query(() => TeamModel)
  async getTeamById(
    @Args('input') input: GetTeamByIDInput
  ): Promise<TeamModel> {
    return await this.getTeamById(input)
  }


  @Query(() => TeamListModel)
  async getTeams(@Args('input') input: GetAllTeamsInput): Promise<TeamListModel> {
    return this.teamService.findAll(input);
  }

  @Mutation(() => Boolean)
  async changeTeamStatus(@Args('input') input: ChangeTeamStatusInput): Promise<boolean> {
    return await this.teamService.changeTeamStatus(input)
  }

}

