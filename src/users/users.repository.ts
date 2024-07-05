import {
	Injectable,
	Inject,
	NotFoundException,
	InternalServerErrorException,
} from "@nestjs/common";
import { User } from "./user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import {
	DatabaseException,
	NotFoundDataException,
} from "../common/exceptions/service.exception";

@Injectable()
export class UsersRepository {
	constructor(
		@Inject("MYSQL_CONNECTION")
		private readonly mysqlConnection: any,
	) {}

	// POST register
	async createUser(userData: CreateUserDto): Promise<boolean> {
		try {
			const { username, date_of_birth, email, password } =
				userData;
			const query: string =
				"INSERT INTO user (username, date_of_birth, email, password) VALUES (?, ?, ?, ?);";
			const res = await this.mysqlConnection.query(query, [
				username,
				date_of_birth,
				email,
				password,
			]);

			return res[0].affectedRows > 0;
		} catch (error) {
			throw DatabaseException(error);
		}
	}

	async getAllUsers(): Promise<User[]> {
		try {
			const [rows] =
				await this.mysqlConnection.query(
					"SELECT * FROM user",
				);

			return rows;
		} catch (error) {
			throw DatabaseException(error.message);
		}
	}

	// GET user by id
	async getUserByEmail(email: string): Promise<User> {
		try {
			const query = "SELECT * FROM use WHERE email = ?";
			const [res] = await this.mysqlConnection.query(query, [
				email,
			]);

			return res[0];
		} catch (error) {
			throw DatabaseException(error);
		}
	}

	// GET user by id
	async getUserById(id: number): Promise<User> {
		try {
			const query = "SELECT * FROM user WHERE id = ?";
			const [res] = await this.mysqlConnection.query(query, [
				id,
			]);

			return res[0];
		} catch (error) {
			throw DatabaseException(error.message);
		}
	}

	async existsEmail(email: string): Promise<boolean> {
		try {
			const query = "SELECT * FROM user WHERE email = ?";
			const [user] = await this.mysqlConnection.query(query, [
				email,
			]);

			return user.length > 0;
		} catch (error) {
			throw new Error(`Email exists DB query: ${error}`);
		}
	}

	// PATCH update user data
	async updateUserData(id: number, data: User) {
		try {
			let update: string[] = [];
			data.username &&
				update.push(`username = "${data.username}"`);
			data.firstname &&
				update.push(`firstname = "${data.firstname}"`);
			data.lastname &&
				update.push(`lastname = "${data.lastname}"`);
			data.email && update.push(`email = "${data.email}"`);
			data.phone && update.push(`phone = "${data.phone}"`);

			const query = `UPDATE user SET ${update.join(", ")} WHERE id = ${id}`;
			const [res] = await this.mysqlConnection.query(query);
			if (res.affectedRows === 0) {
				throw NotFoundDataException("User not found!");
			}
			return;
		} catch (error) {
			throw DatabaseException(error);
		}
	}

	// DELETE delete user profile
	async deleteUserProfile(id: number): Promise<boolean> {
		try {
			const query = "DELETE FROM user WHERE id = ?;";
			let [res] = await this.mysqlConnection.query(query, [
				id,
			]);
			return res.affectedRows > 0;
		} catch (err) {
			throw DatabaseException(err);
		}
	}
}
