import { Module } from '@nestjs/common'
import { UsersModule } from './users.module'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { ConfigService } from '@nestjs/config'
import { LoggerService } from '../logger/custom.logger'

@Module({
  imports: [UsersModule, ConfigService, LoggerService],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UserHttpModule {
}