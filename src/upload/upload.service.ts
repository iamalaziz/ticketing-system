import { Injectable, InternalServerErrorException } from "@nestjs/common";
import * as AWS from "aws-sdk";
import { TUploadFile } from "./upload.interface";

@Injectable()
export class UploadService {
	private readonly AWS_S3_BUCKET = process.env.AWS_S3_BUCKET;
	private readonly BUCKET_REGION = process.env.BUCKET_REGION;

	constructor() {}

	s3 = new AWS.S3({
		accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
		secretAccessKey: process.env.AWS_S3_SECRET_KEY_ID,
	});
	async uploadProfileImage(avatar: Express.Multer.File) {
		const key = `${Date.now() + avatar.originalname}`;
		const imageParams: TUploadFile = {
			file: avatar.buffer,
			bucket: this.AWS_S3_BUCKET,
			name: key,
			mimetype: avatar.mimetype,
		};
		return await this.s3_upload(imageParams);
	}

	async s3_upload(imageParams: TUploadFile) {
		const params = {
			Bucket: imageParams.bucket,
			Key: imageParams.name,
			Body: imageParams.file,
			ACL: "public-read",
			ContentType: imageParams.mimetype,
			ContentDisposition: "inline",
			CreateBucketConfiguration: {
				LocationConstraint: this.BUCKET_REGION,
			},
		};

		try {
			let s3Response = await this.s3.upload(params).promise();

			return s3Response;
		} catch (error) {
			throw new InternalServerErrorException(error);
		}
	}
}
