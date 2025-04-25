import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, Max, Min } from 'class-validator';

@InputType({ description: 'Sort Input Type', isAbstract: true })
class SortType {
  @Field(() => String)
  id: string;

  @Field(() => String)
  value: string;
}

@InputType({ isAbstract: true })
export class FiltersInput {
  @Field(() => String)
  @IsNotEmpty()
  id: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  search: string;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  multiselect: string[];

  @Field(() => [String], { nullable: true })
  @IsOptional()
  users: string[];

  @Field(() => [String], { nullable: true })
  @IsOptional()
  time_tracking_projects: string[];

  @Field(() => [String], { nullable: true })
  @IsOptional()
  jobs: string[];

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  switch: boolean;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  date_range: string[];

  @Field(() => [String], { nullable: true })
  @IsOptional()
  number_range: string[];

  @Field(() => String)
  @IsNotEmpty()
  type:
    | 'search'
    | 'multiselect'
    | 'switch'
    | 'date-range'
    | 'number-range'
    | 'users'
    | 'time-tracking-project'
    | 'jobs';
}

export class FiltersInputDto {
  @Field(() => String)
  @IsNotEmpty()
  id: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  search: string;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  multiselect: string[];

  @Field(() => [String], { nullable: true })
  @IsOptional()
  users: string[];

  @Field(() => [String], { nullable: true })
  @IsOptional()
  jobs: string[];

  @Field(() => [String], { nullable: true })
  @IsOptional()
  time_tracking_projects: string[];

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  switch: boolean;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  date_range: string[];

  @Field(() => [String], { nullable: true })
  @IsOptional()
  number_range: string[];

  @Field(() => String)
  @IsNotEmpty()
  type:
    | 'search'
    | 'multiselect'
    | 'switch'
    | 'date-range'
    | 'number-range'
    | 'users'
    | 'time-tracking-project'
    | 'jobs';
}

@InputType({ description: 'Pagination Query', isAbstract: true })
export class GetAllArgs {
  @Field(() => Int, {
    defaultValue: 1,
    description: 'Page',
    nullable: true,
  })
  @IsOptional()
  @Min(1)
  page = 1;

  @Field(() => Int, {
    nullable: true,
    defaultValue: 30,
    description: 'Limit of data to return max 50',
  })
  @Min(1)
  @Max(50)
  limit = 30;

  @Field(() => [SortType], { nullable: true })
  sort?: SortType[];
}

@InputType({ description: 'Cursor Pagination Query', isAbstract: true })
export class CursorPaginationArgs {
  @Field(() => String, {
    nullable: true,
    description: 'Cursor',
  })
  @IsOptional()
  cursor?: string;

  @Field(() => Int, {
    nullable: true,
    defaultValue: 20,
    description: 'Limit of data to return max 50',
  })
  @Min(1)
  @Max(50)
  limit? = 20;

  @Field(() => [SortType], { nullable: true })
  @IsOptional()
  sort?: SortType[];

  @Field(() => [FiltersInput], { nullable: true })
  @IsOptional()
  filters?: FiltersInput[];
}

@InputType({ description: 'Pagination With Pages Query', isAbstract: true })
export class GetAllWithPageArgs {
  @Field(() => Int, {
    defaultValue: 1,
    description: 'Page',
    nullable: true,
  })
  @IsOptional()
  @Min(1)
  page = 1;

  @Field(() => [FiltersInput], { nullable: true })
  @IsOptional()
  filters?: FiltersInput[];
}
