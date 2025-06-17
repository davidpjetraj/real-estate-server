import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Auth } from '../decorators/auth.decorator';
import { ComplexModel } from './model';
import {
  CreateComplexInput,
  GetAllComplexInput,
  GetComplexInput,
  UpdateComplexInput,
} from './input';
import { SessionDecorator } from '../decorators/session.decorator';
import { ComplexService } from './complex.service';

@Resolver()
export class ComplexResolver {
  constructor(private readonly complexService: ComplexService) {}

  @Auth()
  @Mutation(() => ComplexModel)
  async createComplex(
    @Args('input') input: CreateComplexInput,
    @SessionDecorator('admin_id') admin_id: string,
  ): Promise<ComplexModel> {
    return await this.complexService.create(input, admin_id);
  }

  @Auth()
  @Query(() => [ComplexModel])
  async getAllComplex(
    @Args('input') input: GetAllComplexInput,
  ): Promise<ComplexModel[]> {
    return await this.complexService.getAll(input);
  }

  @Auth()
  @Query(() => [ComplexModel])
  async getAllComplexesList(
    @Args('input') input: GetAllComplexInput,
  ): Promise<ComplexModel[]> {
    return await this.complexService.getAllComplexesList(input);
  }

  @Auth()
  @Query(() => ComplexModel)
  async getComplex(
    @Args('input') input: GetComplexInput,
  ): Promise<ComplexModel> {
    return await this.complexService.findOne(input.id);
  }

  @Auth()
  @Mutation(() => ComplexModel)
  async updateComplex(
    @Args('input') input: UpdateComplexInput,
  ): Promise<ComplexModel> {
    return await this.complexService.updateComplex(input);
  }

  @Auth()
  @Mutation(() => Boolean)
  async deleteComplex(@Args('input') input: GetComplexInput): Promise<boolean> {
    return await this.complexService.deleteComplex(input.id);
  }
}

