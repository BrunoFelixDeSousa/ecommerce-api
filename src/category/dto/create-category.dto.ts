// https://docs.nestjs.com/techniques/validation

import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  readonly name!: string;

  @IsString()
  readonly imageLink?: string;
}
