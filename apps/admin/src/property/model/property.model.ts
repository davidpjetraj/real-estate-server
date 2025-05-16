import {
  Field,
  Float,
  ID,
  Int,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { PropertyCategory } from '@prisma/client';
import { TeamModel } from '../../team/model';

registerEnumType(PropertyCategory, {
  name: 'PropertyCategory',
  description: 'Property Category',
});

@ObjectType({
  description: 'Property Model',
})
export class PropertyModel {
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
  numberOfFloors: number;

  @Field(() => Int, { nullable: true })
  buildingYear: number;

  @Field(() => Int, { nullable: true })
  numberOfRooms: number;

  @Field(() => Int, { nullable: true })
  numberOfBathRooms: number;

  @Field(() => Int, { nullable: true })
  numberOfBedRooms: number;

  @Field(() => Int, { nullable: true })
  numberOfBalconies: number;

  @Field(() => Float, { nullable: true })
  sellPrice: number;

  @Field(() => Float, { nullable: true })
  rentPrice: number;

  @Field(() => Boolean)
  forSale: boolean;

  @Field(() => Boolean)
  forRent: boolean;

  @Field(() => TeamModel)
  agent: TeamModel;

  @Field(() => Boolean)
  deleted: boolean;

  @Field(() => Date)
  created_at: Date;
}

