import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AccountService } from './account.service';
import { Auth } from '../decorators/auth.decorator';
import { ChangeEmailInput, ChangePhoneInput, UpdateNameInput } from './input';
import { SessionDecorator } from '../decorators/session.decorator';
import { AccountModel } from './model';

@Resolver(() => 'Account Resolver')
export class AccountResolver {
  constructor(private readonly accountService: AccountService) {}

  @Auth()
  @Mutation(() => AccountModel)
  async updateName(
    @Args('input') input: UpdateNameInput,
    @SessionDecorator('admin_id') admin_id: string,
  ): Promise<AccountModel> {
    return await this.accountService.updateName(admin_id, input);
  }

  @Auth()
  @Mutation(() => AccountModel)
  async changeEmail(
    @Args('input') input: ChangeEmailInput,
    @SessionDecorator('admin_id') admin_id: string,
  ): Promise<AccountModel> {
    return await this.accountService.changeEmail(admin_id, input);
  }

  @Auth()
  @Mutation(() => AccountModel)
  async changePhone(
    @Args('input') input: ChangePhoneInput,
    @SessionDecorator('admin_id') admin_id: string,
  ): Promise<AccountModel> {
    return await this.accountService.changePhone(admin_id, input);
  }
}

