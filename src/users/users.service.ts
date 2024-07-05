import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { User } from "./user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersRepository } from "./users.repository";
import { NotFoundDataException } from "../common/exceptions";

@Injectable()
export class UsersService {
	constructor(private readonly usersRepository: UsersRepository) {}

	async createUser(userData: CreateUserDto): Promise<boolean> {
		return await this.usersRepository.createUser(userData);
	}

	// GET all users list
	async getAllUsers(): Promise<User[]> {
		return await this.usersRepository.getAllUsers();
	}

	// GET user email
	async getUserByEmail(email: string): Promise<User> {
		const user = await this.usersRepository.getUserByEmail(email);
		if (!user) {
			throw NotFoundDataException(`User with ${email} not found`);
		}
		return user;
	}

	// GET user by ID
	async getUserById(id: number): Promise<User> {
		const user = await this.usersRepository.getUserById(id);
		if (!user) {
			throw NotFoundDataException(`User with ID ${id} not found`);
		}

		return user;
	}

	async existsEmail(email: string): Promise<boolean> {
		try {
			return await this.usersRepository.existsEmail(email);
		} catch (error) {
			console.error("Error checking if email exists:", error.message);
			throw new InternalServerErrorException("Failed to check if email exists");
		}
	}

	// PATCH update user data
	async updateUserData(id: number, data: User): Promise<User> {
		await this.usersRepository.updateUserData(id, data);
		return this.getUserById(id);
	}

	// DELETE user profile
	async deleteUserProfile(id: string): Promise<boolean> {
		const res = await this.usersRepository.deleteUserProfile(Number(id));
		if (!res) throw NotFoundDataException(`User with id ${id} Not Found`);

		return res;
	}
}
