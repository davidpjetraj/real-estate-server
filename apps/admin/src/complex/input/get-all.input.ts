import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class GetAllComplexInput {
  @Field(() => String, { nullable: true })
  search: string;
}
