import { ApiProperty } from '@nestjs/swagger';

import { PageMetaDto } from '../../../common/dto/PageMetaDto';
import { ClientDto } from './ClientDto';

export class ClientsPageDto {
  @ApiProperty({
    type: () => ClientDto,
    isArray: true,
  })
  readonly data: ClientDto[];

  @ApiProperty({ type: () => PageMetaDto })
  readonly meta: PageMetaDto;

  constructor(data: ClientDto[], meta: PageMetaDto) {
    this.data = data;
    this.meta = meta;
  }
}
