'use strict';

import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

import {
  ToEnglishDigits,
  Trim,
} from '../../../decorators/transforms.decorator';
import { IsCellNumber } from '../../../decorators/validators.decorator';

export class UserUpdateDto {
  @Trim()
  @IsString({ message: 'error.user.firstName.string' })
  @IsNotEmpty({ message: 'error.user.firstName.empty' })
  @IsOptional()
  @ApiPropertyOptional()
  readonly firstName: string;

  @Trim()
  @IsString({ message: 'error.user.lastName.string' })
  @IsNotEmpty({ message: 'error.user.lastName.empty' })
  @IsOptional()
  @ApiPropertyOptional()
  readonly lastName: string;

  @IsString({ message: 'error.user.password.string' })
  @MinLength(6, { message: 'error.user.password.length' })
  @IsOptional()
  @ApiPropertyOptional({ minLength: 6 })
  readonly password: string;

  @IsCellNumber({ message: 'error.user.phone.valid' })
  @IsString({ message: 'error.user.phone.string' })
  @ToEnglishDigits()
  @IsOptional()
  @ApiPropertyOptional()
  readonly phone: string;
}
