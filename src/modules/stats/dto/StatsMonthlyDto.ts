import { ApiProperty } from '@nestjs/swagger';

export class StatsTotalDto {
  @ApiProperty()
  readonly totalValue: number;

  @ApiProperty()
  readonly commission: number;

  @ApiProperty()
  readonly avgValue: number;

  @ApiProperty()
  readonly avgCommission: number;

  @ApiProperty()
  readonly count: number;

  @ApiProperty()
  readonly startDate?: string;

  @ApiProperty()
  readonly endDate?: string;

  constructor(
    totalValue: number,
    count: number,
    startDate?: string,
    endDate?: string,
    commissionPercentage = 0.03,
  ) {
    this.totalValue = totalValue;
    this.commission = totalValue * commissionPercentage;
    this.count = count;
    this.avgCommission = this.commission / this.count;
    this.avgValue = this.totalValue / this.count;
    this.startDate = startDate;
    this.endDate = endDate;
  }
}
