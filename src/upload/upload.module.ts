import { Module } from "@nestjs/common";
import { UploadController } from "./upload.controller";
import { UploadService } from "./upload.service";
import { UploadRepository } from "./upload.repository";
import { mysqlProvider } from "src/common/database/mysql.config";

@Module({
	controllers: [UploadController],
	providers: [UploadService, UploadRepository, mysqlProvider],
})
export class UploadModule {}
