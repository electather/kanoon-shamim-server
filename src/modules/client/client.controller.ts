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

import { RoleType } from "../../common/constants/role-type";
import { GetOneOptions } from "../../common/dto/GetOneOptions";
import { AuthUser } from "../../decorators/auth-user.decorator";
import { Roles } from "../../decorators/roles.decorator";
import { AuthGuard } from "../../guards/auth.guard";
import { RolesGuard } from "../../guards/roles.guard";
import { AuthUserInterceptor } from "../../interceptors/auth-user-interceptor.service";
import { UserEntity } from "../user/user.entity";
import { ClientService } from "./client.service";
import { ClientCreateDto } from "./dto/ClientCreateDto";
import { ClientDto } from "./dto/ClientDto";
import { ClientsPageDto } from "./dto/ClientPageDto";
import { ClientsPageOptionsDto } from "./dto/ClientPageOptionsDto";
import { ClientUpdateDto } from "./dto/ClientUpdateDto";

@Controller("clients")
@ApiTags("clients")
@UseGuards(AuthGuard, RolesGuard)
@ApiBearerAuth()
@UseInterceptors(AuthUserInterceptor)
export class ClientController {
  constructor(private _clientService: ClientService) {}

  @Get(":id")
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Get list",
    type: ClientDto,
  })
  async getOne(
    @Param("id", new ParseUUIDPipe({ version: "4" }))
    id: string,
    @Query(new ValidationPipe({ transform: true }))
    options: GetOneOptions
  ): Promise<ClientDto> {
    return (
      await this._clientService.findOne(
        { id },
        {
          relations: options.fields,
        }
      )
    )?.toDto();
  }

  @Get()
  @Roles(RoleType.ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Get clients list",
    type: ClientsPageDto,
  })
  getClients(
    @Query(new ValidationPipe({ transform: true }))
    pageOptionsDto: ClientsPageOptionsDto
  ): Promise<ClientsPageDto> {
    return this._clientService.getClients(pageOptionsDto);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOkResponse({
    type: ClientDto,
    description: "Created item",
  })
  @Roles(RoleType.ADMIN, RoleType.SECRETARY)
  @UseGuards(AuthGuard, RolesGuard)
  async createOne(
    @AuthUser() creator: UserEntity,
    @Body() dto: ClientCreateDto
  ): Promise<ClientDto> {
    return (await this._clientService.createClient(dto, creator))?.toDto();
  }

  @Put(":id")
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: ClientDto,
    description: "edited item",
  })
  @Roles(RoleType.ADMIN, RoleType.SECRETARY)
  @UseGuards(AuthGuard, RolesGuard)
  editById(
    @Param("id", new ParseUUIDPipe({ version: "4" }))
    id: string,
    @Body() updateDto: ClientUpdateDto,
    @AuthUser() editor: UserEntity
  ): Promise<ClientDto> {
    return this._clientService.updateClient(id, updateDto, editor);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: ClientDto,
    description: "deleted item",
  })
  @Roles(RoleType.ADMIN, RoleType.SECRETARY)
  @UseGuards(AuthGuard, RolesGuard)
  deleteById(
    @Param("id", new ParseUUIDPipe({ version: "4" }))
    id: string,
    @AuthUser() editor: UserEntity
  ): Promise<ClientDto> {
    return this._clientService.deleteClient(id, editor);
  }
}
