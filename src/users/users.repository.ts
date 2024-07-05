import {
	Injectable,
	Inject,
	NotFoundException,
	InternalServerErrorException,
} from '@nestjs/common';
import { User, } from './user.entity';
import { CreateUserDto, } from './dto/create-user.dto';
import { NotFoundDataException } from 'src/common/exceptions';
import { DatabaseException } from '../common/exceptions/service.exception';

@Injectable()
export class UsersRepository {
	constructor(
        @Inject('MYSQL_CONNECTION')
        private readonly mysqlConnection: any
	) {}

	// POST register
	async createUser(userData: CreateUserDto): Promise<boolean> {
		try {
			const res = await this.mysqlConnection.query(
				'INSERT INTO user (username, firstname, lastname, age, email, password, phone) VALUES (?, ?, ?, ?, ?, ?, ?);', [...Object.values(userData),]
			);

			return res[0].affectedRows > 0;
		} catch (error) {
			throw new Error(`Error registering user: ${error}`);
		}
	}

	async getAllUsers(): Promise<User[]> {
		const [rows,] = await this.mysqlConnection.query('SELECT * FROM user');

		return rows;
	}

	// GET user by id
	async getUserByEmail(email: string): Promise<User> {
		try {
			const query = 'SELECT * FROM user WHERE email = ?';
			const [res,] = await this.mysqlConnection.query(query, [email,]);
			if (!res[0]) {
				throw new NotFoundException('User not Found from the database');
			}

			return res[0];
		} catch (error) {
			throw new InternalServerErrorException(
				`Database: Error from getUserById: ${error}`
			);
		}
	}
    
	// GET user by id
	async getUserById(id: number): Promise<User> {
		try {
			const query = 'SELECT * FROM user WHERE id = ?';
			const [res,] = await this.mysqlConnection.query(query, [id,]);

			return res[0];
		} catch (error) {
			throw DatabaseException(error.message);
		}
	}

	async existsEmail(email: string): Promise<boolean> {
		try {
			const query = 'SELECT * FROM user WHERE email = ?';
			const [user,] = await this.mysqlConnection.query(query, [email,]);

			return user.length > 0;
		} catch (error) {
			throw new Error(`Email exists DB query: ${error}`);
		}
	}
    
	// PATCH update user data
	async updateUserData(id: number, data: User): Promise<User> {
		try {
			const query =
                'UPDATE user SET firstname = ?, lastname = ?, email = ?, password = ?, phone = ?, username = ? WHERE id = ?';
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
			await this.mysqlConnection.query(query, [id,]);

			return true;
		} catch (err) {
			console.error('Database: Error deleting user:', err);
			throw err;
		}
	}
}
