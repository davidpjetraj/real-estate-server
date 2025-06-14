import { Field, InputType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { CursorPaginationArgs } from '../../common/GetAll';

@InputType()
export class GetAllRequestsInput extends CursorPaginationArgs {
  @Field(() => String, { nullable: true })
  @IsOptional()
  agents?: string[];

  @Field(() => String, { nullable: true })
  @IsOptional()
  client?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  assistant?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  state?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  city?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  street?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  builder?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  complex?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  status?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  search?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  assignee?: string;
}

