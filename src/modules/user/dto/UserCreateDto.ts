'use strict';

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import {
  ToEnglishDigits,
  Trim,
} from '../../../decorators/transforms.decorator';
import { IsCellNumber } from '../../../decorators/validators.decorator';

export class UserCreateDTO {
  @Trim()
  @IsString({ message: 'error.user.firstName.string' })
  @IsNotEmpty({ message: 'error.user.firstName.empty' })
  @ApiProperty()
  readonly firstName: string;

  @Trim()
  @IsString({ message: 'error.user.lastName.string' })
  @IsNotEmpty({ message: 'error.user.lastName.empty' })
  @ApiProperty()
  readonly lastName: string;

  @IsCellNumber({ message: 'error.user.phone.valid' })
  @IsString({ message: 'error.user.phone.string' })
  @ToEnglishDigits()
  @ApiProperty()
  readonly phone: string;
}
