import { Controller, Get, Param, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { UploadService } from "./upload.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiConsumes, ApiOperation, ApiParam } from "@nestjs/swagger";

@Controller("users")
export class UploadController {
	constructor(private readonly uploadService: UploadService) {}

	@Post("avatar")
	@ApiOperation({ summary: "Upload profile image" })
	@ApiConsumes("multipart/form-data")
	@UseInterceptors(FileInterceptor("avatar"))
	/* POST: UPLOAD USER PROFILE IMAGE */
	uploadProfileImage(@UploadedFile() avatar: Express.Multer.File) {
		return this.uploadService.uploadProfileImage(avatar);
	}

	/*
        @Get("avatar/:username")
	@ApiOperation({ summary: "Get profile image" })
	@ApiParam({
		name: "username",
		required: true,
		description: "Username of the user",
	})
	@UseInterceptors(FileInterceptor("file"))
	//  GET: GET USER PROFILE IMAGE 
	getProfileImage(@Param() username:string) {
		return this.uploadService.getProfileImage(username);
	} 
        */
}
