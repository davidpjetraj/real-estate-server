import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PropertyService } from './property.service';
import { Auth } from '../decorators/auth.decorator';
import { PropertyListModel, PropertyModel } from './model';
import {
  CreatePropertyInput,
  GetAllPropertiesInput,
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
}

