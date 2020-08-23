import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { identity, pickBy } from "lodash";
import {
  Between,
  DeepPartial,
  Equal,
  FindConditions,
  LessThanOrEqual,
  MoreThanOrEqual,
  FindOneOptions,
} from "typeorm";

import { RoleType } from "../../common/constants/role-type";
import { PageMetaDto } from "../../common/dto/PageMetaDto";
import { UserEntity } from "../user/user.entity";
import { SessionCreateDto } from "./dto/SessionCreateDto";
import { SessionDto } from "./dto/SessionDto";
import { SessionPageDto } from "./dto/SessionPageDto";
import { SessionPageOptionsDto } from "./dto/SessionPageOptionsDto";
import { SessionUpdateDto } from "./dto/SessionUpdateDto";
import { SessionEntity } from "./session.entity";
import { SessionRepository } from "./session.repository";

@Injectable()
export class SessionService {
  constructor(private readonly _repository: SessionRepository) {}

  /**
   * Find single Session
   */
  async findOne(
    findData: FindConditions<SessionEntity>,
    options?: FindOneOptions<SessionEntity>
  ): Promise<SessionEntity> {
    const session = await this._repository.findOne(findData, options);
    if (!session) {
      throw new NotFoundException();
    }
    return session;
  }

  async getList(
    pageOptionsDto: SessionPageOptionsDto,
    creator: UserEntity
  ): Promise<SessionPageDto> {
    const where: FindConditions<SessionEntity> = {};
    if (pageOptionsDto.startDateMin && !pageOptionsDto.startDateMax) {
      where.startDate = MoreThanOrEqual(pageOptionsDto.startDateMin);
    } else if (!pageOptionsDto.startDateMin && pageOptionsDto.startDateMax) {
      where.startDate = LessThanOrEqual(pageOptionsDto.startDateMax);
    } else if (pageOptionsDto.startDateMin && pageOptionsDto.startDateMax) {
      where.startDate = Between(
        pageOptionsDto.startDateMin,
        pageOptionsDto.startDateMax
      );
    }
    if (creator.role === RoleType.DOCTOR) {
      where.doctorId = Equal(creator.id);
    }

    const [sessions, sessionsCount] = await this._repository.findAndCount({
      where,
      take: pageOptionsDto.take,
      skip: pageOptionsDto.skip,
      order: {
        endDate: pageOptionsDto.order,
      },
      relations: ["client", "doctor"],
    });
    const pageMetaDto = new PageMetaDto({
      pageOptionsDto,
      itemCount: sessionsCount,
    });
    return new SessionPageDto(sessions.toDtos(), pageMetaDto);
  }

  async createSession(
    createDto: SessionCreateDto,
    creator: UserEntity
  ): Promise<SessionDto> {
    const create: DeepPartial<SessionEntity> = {
      ...createDto,
    };

    const session = this._repository.create({
      ...create,
      creator,
    });
    return (await this._repository.save(session)).toDto();
  }

  async deleteSession(id: string, creator: UserEntity): Promise<SessionDto> {
    const found = await this.findOne({ id });
    if (found.creatorId !== creator.id || creator?.role !== RoleType.ADMIN) {
      throw new UnauthorizedException();
    }
    const session = await this._repository.delete(id);
    if (session.affected === 0) {
      throw new NotFoundException();
    }
    return found.toDto();
  }

  async updateSession(
    id: string,
    updatePlanDto: SessionUpdateDto,
    creator: UserEntity
  ): Promise<SessionDto> {
    const found = await this.findOne({ id });
    if (found.creatorId !== creator.id || creator?.role !== RoleType.ADMIN) {
      throw new UnauthorizedException();
    }

    const update: DeepPartial<SessionEntity> = {
      ...updatePlanDto,
    };

    const updated = await this._repository.update(id, pickBy(update, identity));
    if (updated.affected === 0) {
      throw new NotFoundException();
    }
    return (await this.findOne({ id })).toDto();
  }

  // async getDailyStats(options: SessionStatOptionsDto, user: UserEntity) {
  //   const qb = this._repository
  //     .createQueryBuilder('tpi')
  //     .select('SUM(tpi.full_amount)', 'totalValue')
  //     .addSelect('COUNT(*)', 'count')
  //     .addSelect('tpi.start_date::date', 'day')
  //     .groupBy('tpi.start_date::date')
  //     .orderBy('tpi.start_date::date')
  //     .where('tpi.full_amount > :min', {
  //       min: 0,
  //     });
  //   if (user.role !== RoleType.ADMIN) {
  //     qb.andWhere('tpi.creator_id = :id', {
  //       id: user.id,
  //     });
  //   } else if (options.userId) {
  //     qb.andWhere('tpi.creator_id = :id', {
  //       id: options.userId,
  //     });
  //   }
  //   if (options.startDateMin) {
  //     qb.andWhere('tpi.start_date >= :date', {
  //       date: options.startDateMin,
  //     });
  //   }
  //   if (options.startDateMax) {
  //     qb.andWhere('tpi.start_date <= :date', {
  //       date: options.startDateMin,
  //     });
  //   }
  //   const rawResult = await qb.getRawMany();
  //   return new SessionDailyStatDto(rawResult);
  // }

  // async getTotalStats(options: SessionStatOptionsDto, user: UserEntity) {
  //   const qb = this._repository
  //     .createQueryBuilder('tpi')
  //     .select('SUM(tpi.full_amount)', 'totalValue')
  //     .addSelect('COUNT(*)', 'count')
  //     .where('tpi.full_amount > 0');
  //   if (user.role !== RoleType.ADMIN) {
  //     qb.andWhere('tpi.creator_id = :id', {
  //       id: user.id,
  //     });
  //   } else if (options.userId) {
  //     qb.andWhere('tpi.creator_id = :id', {
  //       id: options.userId,
  //     });
  //   }
  //   if (options.startDateMin) {
  //     qb.andWhere('tpi.start_date >= :date', {
  //       date: options.startDateMin,
  //     });
  //   }
  //   if (options.startDateMax) {
  //     qb.andWhere('tpi.start_date <= :date', {
  //       date: options.startDateMin,
  //     });
  //   }

  //   const { totalValue, count } = await qb.getRawOne();
  //   return new SessionTotalStatDto(
  //     Number(totalValue),
  //     Number(count),
  //     options.startDateMin,
  //     options.startDateMax,
  //   );
  // }

  // async changeOwnership({ nextOwner, pervOwner }: OwnerShipChangeDto) {
  //   const res = await this._repository.update(
  //     { creatorId: Equal(pervOwner) },
  //     { creator: { id: nextOwner } },
  //   );
  //   return {
  //     effected: res.affected ?? 0,
  //   };
  // }
}
