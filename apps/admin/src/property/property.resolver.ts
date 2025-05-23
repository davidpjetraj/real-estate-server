import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PropertyService } from './property.service';
import { Auth } from '../decorators/auth.decorator';
import { PropertyListModel, PropertyModel } from './model';
import {
  CreatePropertyInput,
  GetAllPropertiesInput,
  GetPropertyInput,
  RemoveRestorePropertyInput,
  UpdatePropertyInput,
} from './input';

@Resolver()
export class PropertyResolver {
  constructor(private readonly propertyService: PropertyService) {}

  @Auth()
  @Mutation(() => PropertyModel)
  async createProperty(
    @Args('input') input: CreatePropertyInput,
  ): Promise<PropertyModel> {
    return await this.propertyService.createProperty(input);
  }

  @Auth()
  @Mutation(() => PropertyModel)
  async updateProperty(
    @Args('input') input: UpdatePropertyInput,
  ): Promise<PropertyModel> {
    return await this.propertyService.updateProperty(input);
  }

  @Auth()
  @Query(() => PropertyListModel)
  async properties(
    @Args('input') input: GetAllPropertiesInput,
  ): Promise<PropertyListModel> {
    return await this.propertyService.findAll(input);
  }

  @Auth()
  @Query(() => PropertyModel)
  async getProperty(
    @Args('input') input: GetPropertyInput,
  ): Promise<PropertyModel> {
    return await this.propertyService.findOne(input);
  }

  @Auth()
  @Mutation(() => Boolean)
  async removeProperty(
    @Args('input') input: RemoveRestorePropertyInput,
  ): Promise<boolean> {
    return await this.propertyService.removeProperty(input);
  }

  @Auth()
  @Mutation(() => Boolean)
  async restoreProperty(
    @Args('input') input: RemoveRestorePropertyInput,
  ): Promise<boolean> {
    return await this.propertyService.restoreProperty(input);
  }
}

