import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { User } from "./user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersRepository } from "./users.repository";

@Injectable()
export class UsersService {
	constructor(private readonly usersRepository: UsersRepository) {}


	async createUser(userData: CreateUserDto): Promise<boolean> {
		try {
			return await this.usersRepository.createUser(userData);
			
		} catch (error) {
			console.error('Error creating user:', error.message);
            throw new InternalServerErrorException('Failed to create user');
		}
	}

	// GET all users list
	async getAllUsers(): Promise<User[]> {
		try {
			return await this.usersRepository.getAllUsers();
		} catch (error) {
			console.error('Error fetching all users:', error.message);
			throw new InternalServerErrorException('Failed to fetch users');
		}
	}

	// GET user by ID, email
	async getUserBy(email: string): Promise<User> {
		return await this.usersRepository.getUserBy(email);
	}

	// GET user by ID
	async getUserById(id: number): Promise<User> {
		const user = await this.usersRepository.getUserById(id);
		if (!user) {
			throw new NotFoundException(`User with ID ${id} not found`);
		}
		return user;
	}

	async existsEmail(email: string): Promise<boolean> {
		return this.usersRepository.existsEmail(email);
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
