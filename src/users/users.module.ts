import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { mysqlProvider } from "src/common/database/mysql.config";
import { UsersRepository } from "./users.repository";

@Module({
	providers: [UsersService, mysqlProvider, UsersRepository],
	controllers: [UsersController],
	exports: [UsersService],
})
export class UsersModule {}
