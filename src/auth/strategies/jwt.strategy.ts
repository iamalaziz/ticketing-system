import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtDto } from "../dto/jwt.dto";
import { User } from "src/users/user.entity";
import { UsersService } from "src/users/users.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
	constructor(
		private readonly usersService: UsersService,
		readonly configService: ConfigService,
	) {
		super({
			jwtFromRequest:
				ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey:
				configService.get<string>("JWT_ACCESS_SECRET"),
			ignoreExpiration: false,
		});
	}

	async validate(payload: JwtDto): Promise<User> {
		const user = await this.usersService.getUserById(
			payload.userId,
		);
		if (!user) {
			throw new UnauthorizedException();
		}

		return user;
	}
}
