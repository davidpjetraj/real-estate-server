import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ClientService } from './client.service';
import { Auth } from '../decorators/auth.decorator';
import { ClientListModel, ClientModel } from './model';
import {
  CreateClientInput,
  GetAllClientsInput,
  GetClientInput,
  RemoveRestoreClientInput,
  UpdateClientInput,
} from './input';

@Resolver()
export class ClientResolver {
  constructor(private readonly clientService: ClientService) {}
  @Auth()
  @Mutation(() => ClientModel)
  async createClient(
    @Args('input') input: CreateClientInput,
  ): Promise<ClientModel> {
    return await this.clientService.createClient(input);
  }

  @Auth()
  @Mutation(() => ClientModel)
  async updateClient(
    @Args('input') input: UpdateClientInput,
  ): Promise<ClientModel> {
    return await this.clientService.updateClient(input);
  }

  @Auth()
  @Query(() => ClientListModel)
  async clients(
    @Args('input') input: GetAllClientsInput,
  ): Promise<ClientListModel> {
    return await this.clientService.findAll(input);
  }

  @Auth()
  @Query(() => ClientModel)
  async getClient(@Args('input') input: GetClientInput): Promise<ClientModel> {
    return await this.clientService.findOne(input);
  }

  @Auth()
  @Mutation(() => Boolean)
  async removeClient(
    @Args('input') input: RemoveRestoreClientInput,
  ): Promise<boolean> {
    return await this.clientService.removeClient(input);
  }

  @Auth()
  @Mutation(() => Boolean)
  async restoreClient(
    @Args('input') input: RemoveRestoreClientInput,
  ): Promise<boolean> {
    return await this.clientService.restoreClient(input);
  }
}

