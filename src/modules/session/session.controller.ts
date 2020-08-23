"use strict";

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";

import { AuthUser } from "../../decorators/auth-user.decorator";
import { AuthGuard } from "../../guards/auth.guard";
import { AuthUserInterceptor } from "../../interceptors/auth-user-interceptor.service";
import { UserEntity } from "../user/user.entity";
import { SessionCreateDto } from "./dto/SessionCreateDto";
import { SessionDto } from "./dto/SessionDto";
import { SessionPageDto } from "./dto/SessionPageDto";
import { SessionPageOptionsDto } from "./dto/SessionPageOptionsDto";
import { SessionUpdateDto } from "./dto/SessionUpdateDto";
import { SessionService } from "./session.service";
import { GetOneOptions } from "common/dto/GetOneOptions";

@Controller("sessions")
@ApiTags("sessions")
@UseGuards(AuthGuard)
@ApiBearerAuth()
@UseInterceptors(AuthUserInterceptor)
export class SessionController {
  constructor(private _service: SessionService) {}

  @Get(":id")
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Get list",
    type: SessionPageDto,
  })
  async getOne(
    @Param("id", new ParseUUIDPipe({ version: "4" }))
    id: string,
    @Query(new ValidationPipe({ transform: true }))
    options: GetOneOptions
  ): Promise<SessionDto> {
    return (
      await this._service.findOne(
        { id },
        {
          relations: options.fields ?? [],
        }
      )
    )?.toDto();
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Get list",
    type: SessionPageDto,
  })
  getList(
    @Query(new ValidationPipe({ transform: true }))
    pageOptionsDto: SessionPageOptionsDto,
    @AuthUser() creator: UserEntity
  ): Promise<SessionPageDto> {
    return this._service.getList(pageOptionsDto, creator);
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: SessionDto,
    description: "created object",
  })
  create(
    @Body() dto: SessionCreateDto,
    @AuthUser() creator: UserEntity
  ): Promise<SessionDto> {
    return this._service.createSession(dto, creator);
  }

  @Put(":id")
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: SessionDto,
    description: "edited ArchiveLocation",
  })
  editOne(
    @Param("id", new ParseUUIDPipe({ version: "4" }))
    id: string,
    @Body() updateArchiveLocationDto: SessionUpdateDto,
    @AuthUser() creator: UserEntity
  ): Promise<SessionDto> {
    return this._service.updateSession(id, updateArchiveLocationDto, creator);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: SessionDto,
    description: "deleted ArchiveLocation",
  })
  delete(
    @Param("id", new ParseUUIDPipe({ version: "4" }))
    id: string,
    @AuthUser() creator: UserEntity
  ): Promise<SessionDto> {
    return this._service.deleteSession(id, creator);
  }
}
