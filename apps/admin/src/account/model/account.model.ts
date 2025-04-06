import { ObjectType, Field, registerEnumType } from '@nestjs/graphql';
import { AdminStatus } from '@prisma/client';

registerEnumType(AdminStatus, {
  name: 'AdminStatus',
  description: 'Status of the admin account',
});

@ObjectType({ description: 'Account model' })
export class AccountModel {
  @Field(() => String, { description: 'The id of the account' })
  id: string;

  @Field(() => String, { description: 'The first name of the account' })
  first_name: string;

  @Field(() => String, { description: 'The last name of the account' })
  last_name: string;

  @Field(() => String, { description: 'The name of the account' })
  name: string;

  @Field(() => String, { description: 'The email of the account' })
  email: string;

  @Field(() => String, { description: 'The phone of the account' })
  phone?: string;

  @Field(() => Date, { description: 'The birthday of the account' })
  birthday?: Date;

  @Field(() => AdminStatus, { description: 'The status of the account' })
  status: AdminStatus;

  @Field(() => Date, { description: 'The created date of the account' })
  created_at: Date;
}

