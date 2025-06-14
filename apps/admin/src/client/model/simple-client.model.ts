import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { ClientStatus } from '@prisma/client';
import { SimplePropertyModel } from '../../property/model';

registerEnumType(ClientStatus, {
  name: 'ClientStatus',
  description: 'The status of a client',
});

@ObjectType({
  description: 'Client Model',
})
export class SimpleClientModel {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  first_name: string;

  @Field(() => String)
  last_name: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  email: string;

  @Field(() => String, { nullable: true })
  phone: string;

  @Field(() => Date, { nullable: true })
  birthday: Date;

  @Field(() => ClientStatus)
  status: ClientStatus;

  @Field(() => String, { nullable: true })
  state: string;

  @Field(() => String, { nullable: true })
  city: string;

  @Field(() => String, { nullable: true })
  address: string;

  @Field(() => Boolean)
  deleted: boolean;

  @Field(() => Date)
  created_at: Date;
}

