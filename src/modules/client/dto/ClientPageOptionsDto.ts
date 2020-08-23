import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

import { PageOptionsDto } from "../../../common/dto/PageOptionsDto";

export class ClientsPageOptionsDto extends PageOptionsDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  readonly melliCode?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  readonly phone?: string;
}
