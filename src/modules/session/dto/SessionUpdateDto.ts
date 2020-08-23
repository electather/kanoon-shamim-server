'use strict';

import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

export class SessionUpdateDto {
  @IsDate({ message: 'error.session.startDate.date' })
  @Type(() => Date)
  @IsOptional()
  @ApiPropertyOptional()
  startDate: string;

  @IsDate({ message: 'error.session.endDate.date' })
  @Type(() => Date)
  @IsOptional()
  @ApiPropertyOptional()
  endDate: string;

  @IsNumber(undefined, { message: 'error.session.amount.number' })
  @Min(0, { message: 'error.session.amount.min' })
  @IsOptional()
  @ApiPropertyOptional()
  amount: number;

  @IsUUID('4', { message: 'error.session.doctorId.uuidV4' })
  @IsOptional()
  @ApiPropertyOptional()
  doctorId: string;

  @IsUUID('4', { message: 'error.session.clientId.uuidV4' })
  @IsOptional()
  @ApiPropertyOptional()
  clientId: string;

  @IsUUID('4', { message: 'error.session.sessionFiles.uuidV4' })
  @IsOptional()
  @ApiPropertyOptional()
  sessionFileIds: string[];

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  sessionNotes: string;
}
