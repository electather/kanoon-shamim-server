import { ApiProperty } from '@nestjs/swagger';

import { IntervalTypes } from '../../../common/constants/interval-type';
import { StatDetailsDto } from '../../../common/dto/DailyStatDto';

export class StatsIntervalDto {
  @ApiProperty({ type: () => StatDetailsDto, isArray: true })
  readonly dailyStats: StatDetailsDto[];

  @ApiProperty({
    enum: IntervalTypes,
    default: IntervalTypes.DAY,
  })
  readonly interval: IntervalTypes;

  constructor(
    rawDailyStats: { totalValue: string; count: string; day: Date }[],
    commission: number,
    interval: IntervalTypes,
  ) {
    this.dailyStats = rawDailyStats.map(
      (item) =>
        new StatDetailsDto(
          Number(item.totalValue),
          Number(item.count),
          commission,
          item.day,
        ),
    );
    this.interval = interval;
  }
}
