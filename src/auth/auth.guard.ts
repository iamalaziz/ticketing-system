import {
	ExecutionContext,
	Injectable,
	UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
	constructor(private readonly jwtService: JwtService) {
		super();
	}
	canActivate(
		context: ExecutionContext,
	): boolean | Promise<boolean> | Observable<boolean> {
		console.log("jwt guard");
		const request = context.switchToHttp().getRequest();
		const token = request.headers?.authorization?.split(" ")[1];
		if (!token) {
			throw new UnauthorizedException();
		}
		request.user = this.jwtService.verify(token);

		return true;
	}
}
