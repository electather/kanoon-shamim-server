import { Injectable } from '@nestjs/common';

import { RoleType } from '../../common/constants/role-type';
import { UserEntity } from '../user/user.entity';
import { StatsIntervalDto } from './dto/StatsDailyDto';
import { StatsTotalDto } from './dto/StatsMonthlyDto';
import { StatsOneLookDto } from './dto/StatsOneLookDto';
import { StatsPageOptionsDto } from './dto/StatsPageOptionsDto';

@Injectable()
export class StatsService {
  async getDailyStatsTpi(
    options: StatsPageOptionsDto,
    user: UserEntity,
  ): Promise<StatsIntervalDto> {
    // const qb = this._tpiRepository
    //   .createQueryBuilder('insurance')
    //   .select('SUM(insurance.full_amount)', 'totalValue')
    //   .addSelect('COUNT(*)', 'count')
    //   .addSelect(
    //     `date_trunc('${options.interval}', insurance.start_date)`,
    //     'day',
    //   )
    //   .groupBy('day')
    //   .orderBy('day')
    //   .where('insurance.full_amount > :min', {
    //     min: 0,
    //   });
    // if (user.role !== RoleType.ADMIN) {
    //   qb.andWhere('insurance.creator_id = :creatorId', {
    //     creatorId: user.id,
    //   });
    // } else if (options.userId) {
    //   qb.andWhere('insurance.creator_id = :creatorId', {
    //     creatorId: options.userId,
    //   });
    // }
    // if (options.startDateMin && !options.startDateMax) {
    //   qb.andWhere('insurance.start_date >= :minStartDate', {
    //     minStartDate: options.startDateMin,
    //   });
    // } else if (options.startDateMax && !options.startDateMin) {
    //   qb.andWhere('insurance.start_date <= :maxStartDate', {
    //     maxStartDate: options.startDateMax,
    //   });
    // } else {
    //   qb.andWhere(
    //     'insurance.start_date BETWEEN :minStartDate AND :maxStartDate',
    //     {
    //       minStartDate: options.startDateMin,
    //       maxStartDate: options.startDateMax,
    //     },
    //   );
    // }

    // const rawResult = await qb.getRawMany();
    return new StatsIntervalDto([], 0.03, options.interval);
  }

  async getDailyStatsBi(
    options: StatsPageOptionsDto,
    user: UserEntity,
  ): Promise<StatsIntervalDto> {
    // const qb = this._biRepository
    //   .createQueryBuilder('insurance')
    //   .select('SUM(insurance.full_amount)', 'totalValue')
    //   .addSelect('COUNT(*)', 'count')
    //   .addSelect(
    //     `date_trunc('${options.interval}', insurance.start_date)`,
    //     'day',
    //   )
    //   .groupBy('day')
    //   .orderBy('day')
    //   .where('insurance.full_amount > :min', {
    //     min: 0,
    //   });
    // if (user.role !== RoleType.ADMIN) {
    //   qb.andWhere('insurance.creator_id = :creatorId', {
    //     creatorId: user.id,
    //   });
    // } else if (options.userId) {
    //   qb.andWhere('insurance.creator_id = :creatorId', {
    //     creatorId: options.userId,
    //   });
    // }
    // if (options.startDateMin && !options.startDateMax) {
    //   qb.andWhere('insurance.start_date >= :minStartDate', {
    //     minStartDate: options.startDateMin,
    //   });
    // } else if (options.startDateMax && !options.startDateMin) {
    //   qb.andWhere('insurance.start_date <= :maxStartDate', {
    //     maxStartDate: options.startDateMax,
    //   });
    // } else {
    //   qb.andWhere(
    //     'insurance.start_date BETWEEN :minStartDate AND :maxStartDate',
    //     {
    //       minStartDate: options.startDateMin,
    //       maxStartDate: options.startDateMax,
    //     },
    //   );
    // }

    // const rawResult = await qb.getRawMany();
    return new StatsIntervalDto([], 0.05, options.interval);
  }

  async getTotalStatsTpi(
    options: StatsPageOptionsDto,
    user: UserEntity,
  ): Promise<StatsTotalDto> {
    // const qb = this._tpiRepository
    //   .createQueryBuilder('insurance')
    //   .select('SUM(insurance.full_amount)', 'totalValue')
    //   .addSelect('COUNT(*)', 'count')
    //   .where('insurance.full_amount > 0');
    // if (user.role !== RoleType.ADMIN) {
    //   qb.andWhere('insurance.creator_id = :creatorId', {
    //     creatorId: user.id,
    //   });
    // } else if (options.userId) {
    //   qb.andWhere('insurance.creator_id = :creatorId', {
    //     creatorId: options.userId,
    //   });
    // }
    // if (options.startDateMin && !options.startDateMax) {
    //   qb.andWhere('insurance.start_date >= :minStartDate', {
    //     minStartDate: options.startDateMin,
    //   });
    // } else if (options.startDateMax && !options.startDateMin) {
    //   qb.andWhere('insurance.start_date <= :maxStartDate', {
    //     maxStartDate: options.startDateMax,
    //   });
    // } else {
    //   qb.andWhere(
    //     'insurance.start_date BETWEEN :minStartDate AND :maxStartDate',
    //     {
    //       minStartDate: options.startDateMin,
    //       maxStartDate: options.startDateMax,
    //     },
    //   );
    // }

    // const { totalValue, count } = await qb.getRawOne();
    const totalValue = 0,
      count = 0;
    return new StatsTotalDto(
      Number(totalValue),
      Number(count),
      options.startDateMin,
      options.startDateMax,
      0.03,
    );
  }

  async getTotalStatsBi(
    options: StatsPageOptionsDto,
    user: UserEntity,
  ): Promise<StatsTotalDto> {
    // const qb = this._biRepository
    //   .createQueryBuilder('insurance')
    //   .select('SUM(insurance.full_amount)', 'totalValue')
    //   .addSelect('COUNT(*)', 'count')
    //   .where('insurance.full_amount > 0');
    // if (user.role !== RoleType.ADMIN) {
    //   qb.andWhere('insurance.creator_id = :creatorId', {
    //     creatorId: user.id,
    //   });
    // } else if (options.userId) {
    //   qb.andWhere('insurance.creator_id = :creatorId', {
    //     creatorId: options.userId,
    //   });
    // }
    // if (options.startDateMin && !options.startDateMax) {
    //   qb.andWhere('insurance.start_date >= :minStartDate', {
    //     minStartDate: options.startDateMin,
    //   });
    // } else if (options.startDateMax && !options.startDateMin) {
    //   qb.andWhere('insurance.start_date <= :maxStartDate', {
    //     maxStartDate: options.startDateMax,
    //   });
    // } else {
    //   qb.andWhere(
    //     'insurance.start_date BETWEEN :minStartDate AND :maxStartDate',
    //     {
    //       minStartDate: options.startDateMin,
    //       maxStartDate: options.startDateMax,
    //     },
    //   );
    // }

    // const { totalValue, count } = await qb.getRawOne();
    const totalValue = 0,
      count = 0;
    return new StatsTotalDto(
      Number(totalValue),
      Number(count),
      options.startDateMin,
      options.startDateMax,
      0.05,
    );
  }

  async getOneLook(
    options: StatsPageOptionsDto,
    user: UserEntity,
  ): Promise<StatsOneLookDto> {
    const biTotalStats = await this.getTotalStatsBi(options, user);
    const tpiTotalStats = await this.getTotalStatsTpi(options, user);

    return new StatsOneLookDto(
      tpiTotalStats.count,
      biTotalStats.count,
      tpiTotalStats.totalValue,
      biTotalStats.totalValue,
    );
  }
}
