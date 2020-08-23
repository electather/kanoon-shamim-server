import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ClientController } from './client.controller';
import { ClientRepository } from './client.repository';
import { ClientService } from './client.service';

@Module({
  imports: [TypeOrmModule.forFeature([ClientRepository])],
  controllers: [ClientController],
  exports: [ClientService],
  providers: [ClientService],
})
export class ClientModule {}
