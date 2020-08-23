'use strict';

import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { RoleType } from '../../common/constants/role-type';
import { AuthUser } from '../../decorators/auth-user.decorator';
import { Roles } from '../../decorators/roles.decorator';
import { AuthGuard } from '../../guards/auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { AuthUserInterceptor } from '../../interceptors/auth-user-interceptor.service';
import { UserEntity } from '../user/user.entity';
import { StatsIntervalDto } from './dto/StatsDailyDto';
import { StatsTotalDto } from './dto/StatsMonthlyDto';
import { StatsOneLookDto } from './dto/StatsOneLookDto';
import { StatsPageOptionsDto } from './dto/StatsPageOptionsDto';
import { StatsService } from './stats.service';

@Controller('stats')
@ApiTags('stats')
@UseGuards(AuthGuard, RolesGuard)
@ApiBearerAuth()
@UseInterceptors(AuthUserInterceptor)
export class StatsController {
  constructor(private _service: StatsService) {}

  @Get('interval/tpi')
  @Roles(RoleType.ADMIN)
  @HttpCode(HttpStatus.OK)
  async monthlyTpi(
    @Query(new ValidationPipe({ transform: true }))
    pageOptionsDto: StatsPageOptionsDto,
    @AuthUser() user: UserEntity,
  ): Promise<StatsIntervalDto> {
    return this._service.getDailyStatsTpi(pageOptionsDto, user);
  }

  @Get('interval/bi')
  @Roles(RoleType.ADMIN)
  @HttpCode(HttpStatus.OK)
  async monthlyBi(
    @Query(new ValidationPipe({ transform: true }))
    pageOptionsDto: StatsPageOptionsDto,
    @AuthUser() user: UserEntity,
  ): Promise<StatsIntervalDto> {
    return this._service.getDailyStatsBi(pageOptionsDto, user);
  }

  @Get('total/tpi')
  @Roles(RoleType.ADMIN)
  @HttpCode(HttpStatus.OK)
  async totalTpi(
    @Query(new ValidationPipe({ transform: true }))
    pageOptionsDto: StatsPageOptionsDto,
    @AuthUser() user: UserEntity,
  ): Promise<StatsTotalDto> {
    return this._service.getTotalStatsTpi(pageOptionsDto, user);
  }

  @Get('total/bi')
  @Roles(RoleType.ADMIN)
  @HttpCode(HttpStatus.OK)
  totalBi(
    @Query(new ValidationPipe({ transform: true }))
    pageOptionsDto: StatsPageOptionsDto,
    @AuthUser() user: UserEntity,
  ): Promise<StatsTotalDto> {
    return this._service.getTotalStatsBi(pageOptionsDto, user);
  }

  @Get('one-look')
  @Roles(RoleType.ADMIN)
  @HttpCode(HttpStatus.OK)
  oneLook(
    @Query(new ValidationPipe({ transform: true }))
    pageOptionsDto: StatsPageOptionsDto,
    @AuthUser() user: UserEntity,
  ): Promise<StatsOneLookDto> {
    return this._service.getOneLook(pageOptionsDto, user);
  }
}
