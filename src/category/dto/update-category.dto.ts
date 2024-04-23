// https://docs.nestjs.com/techniques/validation

import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-category.dto';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly name?: string;

  @IsOptional()
  @IsString()
  readonly imageLink?: string;
}
