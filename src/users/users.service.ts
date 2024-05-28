import { Injectable, } from '@nestjs/common';
import { User, } from './user.entity';
import { CreateUserDto, } from './dto/create-user.dto';
import { UsersRepository, } from './users.repository';

@Injectable()
export class UsersService {
	constructor(private readonly usersRepository: UsersRepository) {}

	async registerUser(userData: CreateUserDto): Promise<User> {
		const res = await this.usersRepository.registerUser(userData);

		return res;
	}
	// POST auth user
	async loginUser(userData: Partial<User>): Promise<User> {
		const { username, password, } = userData;
		const res = await this.usersRepository.loginUser(username, password);

		return res;
	}

	// GET all users list
	async getAllUsers(): Promise<User[]> {
		return await this.usersRepository.getAllUsers();
	}

	// GET user by ID
	async getUserById(id: number): Promise<User> {
		return await this.usersRepository.getUserById(id);
	}

	// PATCH update user data
	async updateUserData(id: number, data: User): Promise<User> {
		const res = await this.usersRepository.updateUserData(id, data);

		return res;
	}

	// DELETE user profile
	async deleteUserProfile(id: string): Promise<boolean> {
		return await this.usersRepository.deleteUserProfile(Number(id));
	}
}
