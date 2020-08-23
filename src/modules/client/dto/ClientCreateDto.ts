"use strict";

import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

import { ToEnglishDigits } from "../../../decorators/transforms.decorator";
import {
  IsCellNumber,
  IsMelliCode,
} from "../../../decorators/validators.decorator";

export class ClientCreateDto {
  @IsString({ message: "error.client.firstName.string" })
  @IsNotEmpty({ message: "error.client.firstName.empty" })
  @ApiProperty()
  firstName: string;

  @IsString({ message: "error.client.lastName.string" })
  @IsNotEmpty({ message: "error.client.lastName.empty" })
  @ApiProperty()
  lastName: string;

  @IsMelliCode()
  @ApiProperty()
  melliCode: string;

  @IsCellNumber({ message: "error.client.phone.valid" })
  @IsString({ message: "error.client.phone.string" })
  @ToEnglishDigits()
  @ApiProperty()
  phone: string;

  @IsString({ message: "error.client.address.string" })
  @IsNotEmpty({ message: "error.client.address.empty" })
  @IsOptional()
  @ApiPropertyOptional()
  address: string;

  @IsString({ message: "error.client.notes.string" })
  @IsNotEmpty({ message: "error.client.notes.empty" })
  @IsOptional()
  @ApiPropertyOptional()
  notes: string;

  @IsString({ message: "error.client.targetMarket.string" })
  @IsNotEmpty({ message: "error.client.targetMarket.empty" })
  @IsOptional()
  @ApiPropertyOptional()
  targetMarket: string;

  @IsString({ message: "error.client.sex.string" })
  @IsNotEmpty({ message: "error.client.sex.empty" })
  @IsOptional()
  @ApiPropertyOptional()
  sex: string;

  @IsString({ message: "error.client.marriageStatus.string" })
  @IsNotEmpty({ message: "error.client.marriageStatus.empty" })
  @IsOptional()
  @ApiPropertyOptional()
  marriageStatus: string;

  @IsString({ message: "error.client.job.string" })
  @IsNotEmpty({ message: "error.client.job.empty" })
  @IsOptional()
  @ApiPropertyOptional()
  job: string;

  @IsString({ message: "error.client.numberOfChildren.string" })
  @IsNotEmpty({ message: "error.client.numberOfChildren.empty" })
  @IsOptional()
  @ApiPropertyOptional()
  numberOfChildren: string;

  @IsString({ message: "error.client.birthDate.string" })
  @IsNotEmpty({ message: "error.client.birthDate.empty" })
  @IsOptional()
  @ApiPropertyOptional()
  birthDate: Date;
}
