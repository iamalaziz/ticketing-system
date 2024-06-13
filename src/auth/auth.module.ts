import { Module, } from '@nestjs/common';
import { AuthController, } from './auth.controller';
import { AuthService, } from './auth.service';
import { JWTService } from './jwt.service';
import { mysqlProvider } from '../config/mysql.config';

@Module({
	controllers: [AuthController,],
	providers: [AuthService, JWTService, mysqlProvider],
})
export class AuthModule {}
