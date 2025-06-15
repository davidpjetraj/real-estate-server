import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BuilderService } from './builder.service';
import { Auth } from '../decorators/auth.decorator';
import {
  CreateBuilderInput,
  GetAllBuildersInput,
  GetBuilderByIdInput,
  UpdateBuilderInput,
} from './input';
import { BuilderModel } from './model';
import { SessionDecorator } from '../decorators/session.decorator';

@Resolver()
export class BuilderResolver {
  constructor(private readonly builderService: BuilderService) {}

  @Auth()
  @Mutation(() => BuilderModel)
  async createBuilder(
    @Args('input') input: CreateBuilderInput,
    @SessionDecorator('admin_id') admin_id: string,
  ): Promise<BuilderModel> {
    return await this.builderService.createBuilder(admin_id, input);
  }

  @Auth()
  @Query(() => [BuilderModel])
  async builders(
    @Args('input') input: GetAllBuildersInput,
  ): Promise<BuilderModel[]> {
    return await this.builderService.getAll(input);
  }

  @Auth()
  @Query(() => [BuilderModel])
  async getAllBuildersList(
    @Args('input') input: GetAllBuildersInput,
  ): Promise<BuilderModel[]> {
    return await this.builderService.getAllBuildersList(input);
  }

  @Auth()
  @Query(() => BuilderModel)
  async getBuilder(
    @Args('input') input: GetBuilderByIdInput,
  ): Promise<BuilderModel> {
    return await this.builderService.getBuilder(input.id);
  }

  @Auth()
  @Mutation(() => BuilderModel)
  async updateBuilder(
    @Args('input') input: UpdateBuilderInput,
  ): Promise<BuilderModel> {
    return await this.builderService.updateBuilder(input);
  }

  @Auth()
  @Mutation(() => Boolean)
  async deleteBuilder(
    @Args('input') input: GetBuilderByIdInput,
  ): Promise<boolean> {
    return await this.builderService.deleteBuilder(input.id);
  }
}

