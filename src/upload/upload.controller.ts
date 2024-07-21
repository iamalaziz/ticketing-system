import { Controller, Param, Post, UploadedFile, UseInterceptors, UseGuards } from "@nestjs/common";
import { UploadService } from "./upload.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiConsumes, ApiOperation } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/auth.guard";

@Controller("users")
@UseGuards(JwtAuthGuard)
export class UploadController {
	constructor(private readonly uploadService: UploadService) {}

	@Post("avatar/:username")
	@ApiOperation({ summary: "Upload profile image" })
	@ApiConsumes("multipart/form-data")
	@UseInterceptors(FileInterceptor("avatar"))
	/* POST: UPLOAD USER PROFILE IMAGE */
	uploadProfileImage(@UploadedFile() avatar: Express.Multer.File, @Param() params: { username: string }) {
		return this.uploadService.uploadProfileImage(avatar, params.username);
	}
}
