import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsUUID } from 'class-validator';

import { IntervalTypes } from '../../../common/constants/interval-type';

export class StatsPageOptionsDto {
  @IsOptional()
  @ApiPropertyOptional()
  readonly startDateMin?: string;

  @IsOptional()
  @ApiPropertyOptional()
  readonly startDateMax?: string;

  @IsUUID('4', { message: 'error.uuidV4' })
  @IsOptional()
  @ApiPropertyOptional()
  readonly userId?: string;

  @ApiPropertyOptional({
    enum: IntervalTypes,
    default: IntervalTypes.DAY,
  })
  @IsEnum(IntervalTypes, { message: 'error.intervalEnum' })
  @IsOptional()
  readonly interval: IntervalTypes = IntervalTypes.DAY;
}
