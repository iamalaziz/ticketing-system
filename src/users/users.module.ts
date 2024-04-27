import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { mysqlProvider } from 'src/config/mysql.config';

@Module({
  providers: [UsersService, mysqlProvider],
  controllers: [UsersController]
})
export class UsersModule {}
