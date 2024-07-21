import { Module } from "@nestjs/common";
import { MoviesController } from "./movies.controller";
import { MoviesService } from "./movies.service";
import { mysqlProvider } from "../common/database/mysql.config";

@Module({
	controllers: [MoviesController],
	providers: [MoviesService, mysqlProvider],
})
export class MoviesModule {}
