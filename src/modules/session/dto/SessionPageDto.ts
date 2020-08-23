import { ApiProperty } from '@nestjs/swagger';

import { PageMetaDto } from '../../../common/dto/PageMetaDto';
import { SessionDto } from './SessionDto';

export class SessionPageDto {
  @ApiProperty({
    type: () => SessionDto,
    isArray: true,
  })
  readonly data: SessionDto[];

  @ApiProperty({ type: () => PageMetaDto })
  readonly meta: PageMetaDto;

  constructor(data: SessionDto[], meta: PageMetaDto) {
    this.data = data;
    this.meta = meta;
  }
}
