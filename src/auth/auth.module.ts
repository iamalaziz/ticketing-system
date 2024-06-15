import { Module, } from '@nestjs/common';
import { AuthController, } from './auth.controller';
import { AuthService, } from './auth.service';
import { JWTService } from './jwt.service';
import { mysqlProvider } from '../config/mysql.config';
import { AuthRepository } from './auth.repository';
import { UsersModule } from 'src/users/users.module';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
	imports: [UsersModule],
	controllers: [AuthController,],
	providers: [AuthService, JWTService, mysqlProvider, AuthRepository, LocalStrategy],
})
export class AuthModule {}
