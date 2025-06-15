import { IsOptional, IsString } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';
import { CursorPaginationArgs } from '../../common/GetAll';

@InputType()
export class GetAllBuildersInput extends CursorPaginationArgs {
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  search: string;
}

