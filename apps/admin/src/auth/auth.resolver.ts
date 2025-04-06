import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthModel } from './model';
import { RegisterInput, VerifyLoginInput } from './input';
import { LoginInput } from './input/login.input';
import { AccountModel } from '../account/model';
import { Auth } from '../decorators/auth.decorator';
import { SessionDecorator } from '../decorators/session.decorator';

@Resolver(() => 'Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthModel)
  register(@Args('input') input: RegisterInput): Promise<AuthModel> {
    return this.authService.register(input);
  }

  @Mutation(() => String)
  async login(@Args('input') input: LoginInput): Promise<string> {
    return await this.authService.login(input.email, input.password);
  }

  @Mutation(() => AuthModel)
  async verifyLogin(@Args('input') input: VerifyLoginInput) {
    return await this.authService.verifyLogin(input.token);
  }

  @Auth()
  @Query(() => AccountModel)
  async account(@SessionDecorator('admin_id') admin_id: string) {
    return await this.authService.account(admin_id);
  }
}
