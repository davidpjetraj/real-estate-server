import {
  Field,
  Float,
  ID,
  Int,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { PropertyCategory } from '@prisma/client';

registerEnumType(PropertyCategory, {
  name: 'PropertyCategory',
  description: 'Property Category',
});

@ObjectType({
  description: 'Simple Property Model',
})
export class SimplePropertyModel {
  @Field(() => ID)
  id: string;

  @Field(() => Int)
  short_id: number;

  @Field(() => String)
  title: string;

  @Field(() => String)
  description: string;

  @Field(() => PropertyCategory)
  category: PropertyCategory;

  @Field(() => String)
  state: string;

  @Field(() => String)
  city: string;

  @Field(() => String)
  address: string;

  @Field(() => Float, { nullable: true })
  surface: number;

  @Field(() => Int, { nullable: true })
  floor: number;

  @Field(() => Int, { nullable: true })
  number_of_floors: number;

  @Field(() => Int, { nullable: true })
  building_year: number;

  @Field(() => Int, { nullable: true })
  number_of_rooms: number;

  @Field(() => Int, { nullable: true })
  number_of_bathrooms: number;

  @Field(() => Int, { nullable: true })
  number_of_bedrooms: number;

  @Field(() => Int, { nullable: true })
  number_of_balconies: number;

  @Field(() => Float, { nullable: true })
  sell_price: number;

  @Field(() => Float, { nullable: true })
  rent_price: number;

  @Field(() => Boolean)
  for_sale: boolean;

  @Field(() => Boolean)
  for_rent: boolean;

  @Field(() => Boolean)
  deleted: boolean;

  @Field(() => Date)
  created_at: Date;
}

