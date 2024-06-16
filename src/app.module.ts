import { Module, } from '@nestjs/common';
import { AppController, } from './app.controller';
import { AppService, } from './app.service';
import { UsersModule, } from './users/users.module';

import { ConfigModule, } from '@nestjs/config';
import { mysqlProvider, } from './common/database/mysql.config';
import { MoviesModule, } from './movies/movies.module';
import { TicketsModule, } from './tickets/tickets.module';
import { AuthModule, } from './auth/auth.module';
import config from './common/config/config';

@Module({
	imports: [
		UsersModule,
		ConfigModule.forRoot({
			isGlobal: true,
			load: [config,], 
		}),
		MoviesModule,
		TicketsModule,
		AuthModule,
	],
	controllers: [AppController,],
	providers: [AppService, mysqlProvider,],
})
export class AppModule {}
