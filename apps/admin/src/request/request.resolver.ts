import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { RequestService } from './request.service';
import { Auth } from '../decorators/auth.decorator';
import { RequestListModel, RequestModel } from './model';
import {
  CreateRequestInput,
  GetAllRequestsInput,
  GetByIdInput,
  RequestInput,
} from './input';
import { SessionDecorator } from '../decorators/session.decorator';

@Resolver()
export class RequestResolver {
  constructor(private readonly requestService: RequestService) {}

  @Auth()
  @Mutation(() => RequestModel)
  async createRequest(
    @Args('input') input: CreateRequestInput,
    @SessionDecorator('admin_id') admin_id: string,
  ): Promise<RequestModel> {
    return await this.requestService.create(admin_id, input);
  }

  @Auth()
  @Query(() => RequestListModel)
  async findAllRequests(
    @Args('input') input: GetAllRequestsInput,
    @SessionDecorator('admin_id') admin_id: string,
  ): Promise<RequestListModel> {
    return await this.requestService.findAll(admin_id, input);
  }

  @Auth()
  @Query(() => RequestModel)
  async findOneRequest(
    @Args('input') input: GetByIdInput,
    @SessionDecorator('admin_id') admin_id: string,
  ): Promise<RequestModel> {
    return await this.requestService.findOne(input.id, admin_id);
  }

  @Mutation(() => RequestModel)
  async updateRequest(
    @Args('input') input: RequestInput,
    @SessionDecorator('admin_id') admin_id: string,
  ): Promise<RequestModel> {
    return await this.requestService.update(input, admin_id);
  }
}

