import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { mysqlProvider } from "../common/database/mysql.config";
import { AuthRepository } from "./auth.repository";
import { UsersModule } from "src/users/users.module";
import { LocalStrategy } from "./strategies/local.strategy";
import { PassportModule } from "@nestjs/passport";
import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { SecurityConfig } from "src/common/config/config.interface";

@Module({
	imports: [
		UsersModule,
		PassportModule.register({ defaultStrategy: "jwt" }),
		JwtModule.registerAsync({
			useFactory: async (configService: ConfigService) => {
				const securityConfig =
					configService.get<SecurityConfig>(
						"security",
					);

				return {
					secret: configService.get<string>(
						"JWT_ACCESS_SECRET",
					),
					signOptions: {
						expiresIn: securityConfig.expiresIn,
					},
				};
			},
			inject: [ConfigService],
		}),
	],
	controllers: [AuthController],
	providers: [AuthService, mysqlProvider, AuthRepository, LocalStrategy],
})
export class AuthModule {}
