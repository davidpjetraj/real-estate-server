import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType({ description: 'Auth model' })
export class AuthModel {
  @Field(() => String, {
    description: 'The access token of the authenticated user',
  })
  access_token: string;

  @Field(() => String, {
    description: 'The refresh token of the authenticated user',
  })
  refresh_token: string;
}

