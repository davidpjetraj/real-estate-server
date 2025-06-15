import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { AdminStatus } from '@prisma/client';

registerEnumType(AdminStatus, {
  name: 'AdminStatus',
  description: 'The status of an admin user',
});

@ObjectType()
export class TeamModel {
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

  @Field(() => String, {
    description: 'The phone of the account',
    nullable: true,
  })
  phone?: string;

  @Field(() => Date, {
    description: 'The birthday of the account',
    nullable: true,
  })
  birthday?: Date;

  @Field(() => AdminStatus, { description: 'The status of the account' })
  status: AdminStatus;

  @Field(() => Boolean, { description: 'The deleted status of the account' })
  deleted: boolean;

  @Field(() => Date, { description: 'The created date of the account' })
  created_at: Date;
}
