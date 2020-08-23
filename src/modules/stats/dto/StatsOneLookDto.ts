import { ApiProperty } from '@nestjs/swagger';

export class StatsOneLookDto {
  @ApiProperty()
  readonly tpiCount: number;

  @ApiProperty()
  readonly bodyInsuranceCount: number;

  @ApiProperty()
  readonly totalCommission: number;

  constructor(
    tpiCount: number,
    bodyInsuranceCount: number,
    tpiSum: number,
    bodyInsuranceSum: number,
  ) {
    this.tpiCount = tpiCount;
    this.bodyInsuranceCount = bodyInsuranceCount;
    this.totalCommission = tpiSum * 0.03 + bodyInsuranceSum * 0.03;
  }
}
