import {
	Injectable, Inject, NotFoundException, InternalServerErrorException, 
} from '@nestjs/common';
import { User, } from './user.entity';
import { CreateUserDto, } from './dto/create-user.dto';

@Injectable()
export class UsersRepository {
	constructor(
    @Inject('MYSQL_CONNECTION')
    private readonly mysqlConnection: any,
	) {}

	// POST register
	async registerUser(userData: CreateUserDto): Promise<User> {
		try {
			const sql = 'SELECT * FROM user WHERE email = ?;';
			const userExists = await this.mysqlConnection.query(sql, [
				userData.email,
			]);
			console.log('User exsit: ', userExists[0]);
			if (userExists[0].length !== 0) {
				throw new Error('User already exists. Please Login!');
			}
			await this.mysqlConnection.query(
				'INSERT INTO user (username, firstname, lastname, age, email, password, phone) VALUES (?, ?, ?, ?, ?, ?, ?);', [...Object.values(userData),],
			);

			return userData;
		} catch (error) {
			throw new Error(`Error registering user: ${error}`);
		}
	}

	async loginUser(username: string, password: string): Promise<User> {
		try {
			const query = 'SELECT * FROM user WHERE email = ? AND password = ?';
			const user = await this.mysqlConnection.query(query, [
				username, password,
			]);
			console.log(user);
			if (user.length > 0) {
				console.log(user[1]);

				return user[1];
			}
		} catch (error) {
			console.error('Error logging in user:', error);
			throw error;
		}
	}

	async getAllUsers(): Promise<User[]> {
		const [rows,] = await this.mysqlConnection.query('SELECT * FROM user');

		return rows;
	}

	// GET user by id
	async getUserById(id: number): Promise<User> {
		try {
			const query = `SELECT * FROM user WHERE id = ${id}`;
			const [res,] = await this.mysqlConnection.query(query);
			if (!res[0]) {
				throw new NotFoundException('User not Found from the database');
			}

			return res[0];
		} catch (error) {
			throw new InternalServerErrorException(`Database: Error from getUserById: ${error}`);
		}
	}

	// PATCH update user data
	async updateUserData(id: number, data: User): Promise<User> {
		try {
			const query = 'UPDATE user SET firstname = ?, lastname = ?, email = ?, password = ?, phone = ?, username = ? WHERE id = ?';
			const values = [
				data.firstname,
				data.lastname,
				data.email,
				data.password,
				data.phone,
				data.username,
				id,
			];
			const res = await this.mysqlConnection.execute(query, values);
			console.log(res);

			if (res.length === 0) {
				throw new Error('User not found or update failed');
			}

			return res;
		} catch (err) {
			console.error('Database: Error updating user data:', err.message);
			throw new Error('Could not update user data');
		}
	}

	// DELETE delete user profile
	async deleteUserProfile(id: number): Promise<boolean> {
		try {
			const query = 'DELETE FROM user WHERE id = ?;';
			// QUESTION: How to handle not existing id in mysql
			const res = await this.mysqlConnection.query(query, [id,]);
			console.log(res);

			return true;
		} catch (err) {
			console.error('Database: Error deleting user:', err);
			throw err;
		}
	}
}
