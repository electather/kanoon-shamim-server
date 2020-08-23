"use strict";

import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MinLength, IsEnum } from "class-validator";

import {
  ToEnglishDigits,
  Trim,
} from "../../../decorators/transforms.decorator";
import { IsCellNumber } from "../../../decorators/validators.decorator";
import { RoleType } from "common/constants/role-type";

export class UserRegisterDto {
  @Trim()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly firstName: string;

  @Trim()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly lastName: string;

  @IsString()
  @MinLength(6)
  @ApiProperty({ minLength: 6 })
  readonly password: string;

  @IsCellNumber({ message: "invalid phone number" })
  @IsString()
  @ToEnglishDigits()
  @ApiProperty()
  readonly phone: string;

  @ApiProperty({
    enum: RoleType,
    default: RoleType.SECRETARY,
  })
  @IsEnum(RoleType)
  readonly role: RoleType;
}
