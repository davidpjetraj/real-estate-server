import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType({
  description: 'Debt Amount Model',
})
export class DebtAmountModel {
  @Field(() => Int)
  totalDebt: number;

  @Field(() => Int)
  currentDebt: number;
}
