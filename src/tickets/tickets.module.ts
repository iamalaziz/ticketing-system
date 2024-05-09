import { Module } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { mysqlProvider } from 'src/config/mysql.config';

@Module({
  controllers: [TicketsController],
  providers: [TicketsService, mysqlProvider],
})
export class TicketsModule {}
