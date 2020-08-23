"use strict";

import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsDate,
  IsNumber,
  IsUUID,
  Min,
  IsEnum,
  IsOptional,
} from "class-validator";
import { FileDto } from "modules/files/dto/FileDto";
import { SessionStatus } from "../session-status.enum";

export class SessionCreateDto {
  @ApiPropertyOptional()
  sessionNotes?: string;

  @ApiPropertyOptional()
  sessionFiles?: FileDto[];

  @IsDate({ message: "error.session.startDate.date" })
  @Type(() => Date)
  @ApiProperty()
  startDate: string;

  @IsDate({ message: "error.session.endDate.date" })
  @Type(() => Date)
  @ApiProperty()
  endDate: string;

  @IsNumber(undefined, { message: "error.session.amount.number" })
  @Min(0, { message: "error.session.amount.min" })
  @ApiProperty()
  amount: number;

  @IsUUID("4", { message: "error.session.doctorId.uuidV4" })
  @ApiProperty()
  doctorId: string;

  @IsUUID("4", { message: "error.session.clientId.uuidV4" })
  @ApiProperty()
  clientId: string;

  @IsEnum(SessionStatus)
  @IsOptional()
  @ApiProperty()
  status: SessionStatus;
}
