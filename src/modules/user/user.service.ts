import { Injectable, UnauthorizedException } from '@nestjs/common';
import { identity, pickBy } from 'lodash';
import {
  DeepPartial,
  Equal,
  FindConditions,
  FindOneOptions,
  Like,
} from 'typeorm';

import { RoleType } from '../../common/constants/role-type';
import { OwnerShipChangeDto } from '../../common/dto/OwnerShipChangeDto';
import { PageMetaDto } from '../../common/dto/PageMetaDto';
import { UserNotFoundException } from '../../exceptions/user-not-found.exception';
import { UserRegisterDto } from '../auth/dto/UserRegisterDto';
import { UserCreateDTO } from './dto/UserCreateDto';
import { UserDto } from './dto/UserDto';
import { UsersPageDto } from './dto/UsersPageDto';
import { UsersPageOptionsDto } from './dto/UsersPageOptionsDto';
import { UserUpdateDto } from './dto/UsersUpdateDto';
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly _userRepository: UserRepository) {}

  /**
   * Find single user
   */
  async findOne(
    findData: FindConditions<UserEntity>,
    options?: FindOneOptions<UserEntity>,
  ): Promise<UserEntity> {
    const user = await this._userRepository.findOne(findData, options);
    if (!user) {
      throw new UserNotFoundException();
    }
    return user;
  }

  async createUser(
    {
      // eslint-disable-next-line @typescript-eslint/tslint/config
      ...userRegisterDto
    }: UserCreateDTO,
    creator: UserEntity,
  ) {
    const create: DeepPartial<UserEntity> = {
      ...userRegisterDto,
    };

    create.creator = { id: creator.id };

    return this._userRepository.save(this._userRepository.create(create));
  }

  async registerUser(
    { ...userRegisterDto }: UserRegisterDto,
    creator?: UserEntity,
  ) {
    const create: DeepPartial<UserEntity> = {
      ...userRegisterDto,
    };

    if (creator) {
      create.creator = { id: creator.id };
    }

    return this._userRepository.save(this._userRepository.create(create));
  }
  /**
   * @deprecated
   *
   * @param {UsersPageOptionsDto} pageOptionsDto
   * @returns {Promise<UsersPageDto>}
   * @memberof UserService
   */
  async getUsers(pageOptionsDto: UsersPageOptionsDto): Promise<UsersPageDto> {
    const where: FindConditions<UserEntity>[] = [];
    if (pageOptionsDto.q) {
      where.push(
        { firstName: Like(`%${pageOptionsDto.q}%`) },
        { lastName: Like(`%${pageOptionsDto.q}%`) },
      );
    }
    if (pageOptionsDto.phone) {
      where.push({
        phone: Like(`%${pageOptionsDto.melliCode}%`),
      });
    }
    const [users, usersCount] = await this._userRepository.findAndCount({
      where,
      take: pageOptionsDto.take,
      skip: pageOptionsDto.skip,
      order: {
        createdAt: pageOptionsDto.order,
      },
      relations: ['info', 'avatar'],
    });
    const pageMetaDto = new PageMetaDto({
      pageOptionsDto,
      itemCount: usersCount,
    });
    return new UsersPageDto(users.toDtos(), pageMetaDto);
  }

  async getUsersAlt(
    pageOptionsDto: UsersPageOptionsDto,
  ): Promise<UsersPageDto> {
    const qb = this._userRepository
      .createQueryBuilder('users')
      .take(pageOptionsDto.take)
      .skip(pageOptionsDto.skip)
      .where('users.role = :role', { role: RoleType.ADMIN });
    if (pageOptionsDto.q) {
      qb.orWhere('users.first_name LIKE :firstName', {
        firstName: pageOptionsDto.q,
      });
      qb.orWhere('users.last_name LIKE :lastName', {
        lastName: pageOptionsDto.q,
      });
    }
    if (pageOptionsDto.phone) {
      qb.andWhere('users.phone LIKE :phone', {
        phone: '%' + pageOptionsDto.phone + '%',
      });
    }
    const [users, usersCount] = await qb.getManyAndCount();
    const pageMetaDto = new PageMetaDto({
      pageOptionsDto,
      itemCount: usersCount,
    });

    return new UsersPageDto(users.toDtos(), pageMetaDto);
  }

  async updateUser(
    id: string,
    userUpdateDto: UserUpdateDto,
    editor: UserEntity,
  ): Promise<UserDto> {
    const found = await this.findOne({ id });
    if (
      editor.role !== RoleType.ADMIN &&
      found.creatorId &&
      found.creatorId !== editor?.id
    ) {
      throw new UnauthorizedException('you are not the creator!');
    }
    const update: DeepPartial<UserEntity> = {
      ...userUpdateDto,
      creator: { id: editor?.id },
    };

    await this._userRepository.update(id, pickBy(update, identity));
    return found.toDto();
  }

  async deleteUser(id: string, editor: UserEntity): Promise<UserDto> {
    const found = await this.findOne({ id });
    if (
      editor.role !== RoleType.ADMIN &&
      found.creatorId &&
      found.creatorId !== editor?.id
    ) {
      throw new UnauthorizedException('you are not the creator!');
    }
    await this._userRepository.delete(id);
    return found.toDto();
  }

  async changeOwnership({ nextOwner, pervOwner }: OwnerShipChangeDto) {
    const res = await this._userRepository.update(
      { creatorId: Equal(pervOwner) },
      { creator: { id: nextOwner } },
    );
    return {
      effected: res.affected ?? 0,
    };
  }
}
