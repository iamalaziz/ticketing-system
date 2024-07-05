import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { AuthRepository } from "./auth.repository";
import { AuthLoginDto } from "./dto/auth.dto";
import * as bcrypt from "bcrypt";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { SecurityConfig } from "src/common/config/config.interface";

@Injectable()
export class AuthService {
	constructor(
		private readonly authRepository: AuthRepository,
		private readonly usersService: UsersService,
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService,
	) {}
	// POST auth user
	async validateLogin({ email, password }: AuthLoginDto) {
		/* check if user exists */
		const user = await this.usersService.getUserByEmail(email);
		if (user === undefined) {
			throw new NotFoundException(`User with email ${email} not found`);
		}

		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			throw new UnauthorizedException("Invalid password!");
		}

		return this.generateTokens({ userId: user.id });
	}

	// POST register user
	async registerUser(userData: CreateUserDto) {
		/* check if email is not already registered */
		const existsEmail = await this.usersService.existsEmail(userData.email);
		if (existsEmail) {
			throw new ConflictException("Email is already registered. Please Login!");
		}
		/* hash password */
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(userData.password, salt);
		userData.password = hashedPassword;

		await this.usersService.createUser(userData);
		const { id } = await this.usersService.getUserByEmail(userData.email);

		return this.generateTokens({ userId: id });
	}

	/* generate tokens */
	generateTokens(payload: { userId: number }) {
		return {
			accessToken: this.generateAccessToken(payload),
			refreshToken: this.generateRefreshToken(payload),
		};
	}

	private generateAccessToken(payload: { userId: number }): string {
		return this.jwtService.sign(payload);
	}
	private generateRefreshToken(payload: { userId: number }): string {
		const securityConfig = this.configService.get<SecurityConfig>("security");

		return this.jwtService.sign(payload, {
			secret: this.configService.get("JWT_REFRESH_SECRET"),
			expiresIn: securityConfig.refreshIn,
		});
	}
}
