/* eslint-disable import/no-unresolved */
"use strict";

import { ApiPropertyOptional } from "@nestjs/swagger";

import { AbstractDto } from "../../../common/dto/AbstractDto";
import { UserDto } from "../../user/dto/UserDto";
import { SessionEntity } from "../session.entity";
import { ClientDto } from "./../../client/dto/ClientDto";
import { SessionStatus } from "../session-status.enum";
import { FileDto } from "modules/files/dto/FileDto";

export class SessionDto extends AbstractDto {
  @ApiPropertyOptional()
  sessionNotes?: string;

  @ApiPropertyOptional()
  sessionFiles?: FileDto[];

  @ApiPropertyOptional()
  startDate: Date;

  @ApiPropertyOptional()
  endDate: Date;

  @ApiPropertyOptional()
  amount: number;

  @ApiPropertyOptional({ type: () => UserDto })
  doctor: UserDto;

  @ApiPropertyOptional()
  doctorId?: string;

  @ApiPropertyOptional({ type: () => ClientDto })
  client: ClientDto;

  @ApiPropertyOptional()
  clientId?: string;

  @ApiPropertyOptional({ type: () => UserDto })
  creator?: UserDto;

  @ApiPropertyOptional()
  creatorId?: string;

  @ApiPropertyOptional()
  status: SessionStatus;

  constructor(entity: SessionEntity) {
    super(entity);
    this.sessionNotes = entity.sessionNotes;
    this.sessionFiles = entity.sessionFiles?.toDtos();
    this.startDate = entity.startDate;
    this.endDate = entity.endDate;
    this.amount = entity.amount;
    this.doctor = entity.doctor?.toDto();
    this.doctorId = entity.doctorId;
    this.clientId = entity.clientId;
    this.client = entity.client?.toDto();
    this.creator = entity.creator?.toDto();
    this.creatorId = entity.creatorId;
    this.status = entity.status;
  }
}
