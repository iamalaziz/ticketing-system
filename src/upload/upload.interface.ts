export type TUploadFile = {
	username: string;
	file: Buffer;
	bucket: string;
	name: string;
	mimetype: string;
};
