import { Injectable, Inject } from "@nestjs/common";
import { DatabaseException, NotFoundDataException } from "../common/exceptions/service.exception";

@Injectable()
export class UploadRepository {
	constructor(
		@Inject("MYSQL_CONNECTION")
		private readonly mysqlConnection: any,
	) {}

	async updateUserAvatar(url: string, username: string) {
		try {
			const query: string = "UPDATE user SET profileImage = ? WHERE username = ?";
			const [res] = await this.mysqlConnection.query(query, [url, username]);

			if (res.affectedRows === 0) {
				throw NotFoundDataException("User not found!");
			}

			return true;
		} catch (error) {
			throw DatabaseException(error);
		}
	}
}
