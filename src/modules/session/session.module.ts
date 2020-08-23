import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SessionController } from './session.controller';
import { SessionRepository } from './session.repository';
import { SessionService } from './session.service';

@Module({
  imports: [TypeOrmModule.forFeature([SessionRepository])],
  controllers: [SessionController],
  exports: [SessionService],
  providers: [SessionService],
})
export class SessionModule {}
