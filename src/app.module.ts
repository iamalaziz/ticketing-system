import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

import { ConfigModule } from '@nestjs/config';
import { mysqlProvider } from './config/mysql.config';
import { MoviesModule } from './movies/movies.module';

@Module({
  imports: [UsersModule, ConfigModule.forRoot(), MoviesModule],
  controllers: [AppController],
  providers: [AppService, mysqlProvider],
})
export class AppModule {}
