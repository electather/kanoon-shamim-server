/* eslint-disable import/no-unresolved */
"use strict";

import { ApiPropertyOptional } from "@nestjs/swagger";

import { AbstractDto } from "../../../common/dto/AbstractDto";
import { UserDto } from "../../user/dto/UserDto";
import { ClientEntity } from "../client.entity";

export class ClientDto extends AbstractDto {
  @ApiPropertyOptional({ type: () => UserDto })
  creator?: UserDto;

  @ApiPropertyOptional()
  creatorId?: string;

  @ApiPropertyOptional()
  firstName: string;

  @ApiPropertyOptional()
  lastName: string;

  @ApiPropertyOptional()
  address?: string;

  @ApiPropertyOptional()
  melliCode: string;

  @ApiPropertyOptional()
  phone: string;

  @ApiPropertyOptional()
  notes: string;

  constructor(client: ClientEntity) {
    super(client);
    this.firstName = client.firstName;
    this.lastName = client.lastName;
    this.address = client.address;
    this.creator = client.creator?.toDto();
    this.creatorId = client.creatorId;
    this.notes = client.notes;
    this.phone = client.phone;
    this.melliCode = client.melliCode;
  }
}
