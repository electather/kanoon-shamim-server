import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

import { PageOptionsDto } from '../../../common/dto/PageOptionsDto';

export class SessionPageOptionsDto extends PageOptionsDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  readonly startDateMin?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  readonly startDateMax?: string;
}
