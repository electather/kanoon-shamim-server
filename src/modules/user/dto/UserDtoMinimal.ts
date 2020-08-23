'use strict';

import { ApiPropertyOptional } from '@nestjs/swagger';

import { RoleType } from '../../../common/constants/role-type';
import { MinimalAbstractDto } from '../../../common/dto/MinimalAbstractDto';
import { UserDto } from './UserDto';

export class UserDtoMinimal extends MinimalAbstractDto {
  @ApiPropertyOptional()
  firstName: string;

  @ApiPropertyOptional()
  lastName: string;

  @ApiPropertyOptional({ enum: RoleType })
  role: RoleType;

  @ApiPropertyOptional()
  phone?: string;

  @ApiPropertyOptional()
  creatorId?: string;

  constructor(user: UserDto) {
    super(user);
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.role = user.role;
    this.phone = user.phone;
    this.creatorId = user.creatorId;
  }
}
