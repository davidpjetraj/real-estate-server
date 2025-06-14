import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { RequestService } from './request.service';
import { Auth } from '../decorators/auth.decorator';
import { RequestModel } from './model';
import { CreateRequestInput } from './input';
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
}

