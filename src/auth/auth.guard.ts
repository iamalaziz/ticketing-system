import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { verify } from "jsonwebtoken";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
	constructor(private readonly jwtService: JwtService) {
		super();
	}
	canActivate(context: ExecutionContext): boolean {
		try {
			const request = context.switchToHttp().getRequest();
			const token = request.headers?.authorization?.split(" ")[2];
			if (!token) {
				throw new UnauthorizedException();
			}
			const key = process.env.JWT_ACCESS_SECRET;
			request.user = verify(token, key);

			return true;
		} catch (error) {
			/// Need to handle token errors
			console.log(error);
		}
	}
}
