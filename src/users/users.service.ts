import {
	Injectable,
	InternalServerErrorException,
	NotFoundException,
} from "@nestjs/common";
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
			console.error("Error creating user:", error.message);
			throw new InternalServerErrorException("Failed to create user");
		}
	}

	// GET all users list
	async getAllUsers(): Promise<User[]> {
		try {
			return await this.usersRepository.getAllUsers();
		} catch (error) {
			console.error("Error fetching all users:", error.message);
			throw new InternalServerErrorException("Failed to fetch users");
		}
	}

	// GET user by ID, email
	async getUserByEmail(email: string): Promise<User> {
		try {
			return await this.usersRepository.getUserByEmail(email);
		} catch (error) {
			console.error("Error fetching user by email:", error.message);
			throw new InternalServerErrorException("Failed to fetch user by email");
		}
	}

	// GET user by ID
	async getUserById(id: number): Promise<User> {
		try {
			const user = await this.usersRepository.getUserById(id);
			if (!user) {
				throw new NotFoundException(`User with ID ${id} not found`);
			}
			return user;
		} catch (error) {
			if (error instanceof NotFoundException) {
				throw error; // rethrow the NotFoundException to maintain the specific error type
			}
			console.error("Error fetching user by ID:", error.message);
			throw new InternalServerErrorException("Failed to fetch user by ID");
		}
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
		try {
			return await this.usersRepository.updateUserData(id, data);
			
		} catch (error) {
			console.error("Error while updating user data:", + error.message);
			throw new InternalServerErrorException("Failed to update user data")
		}
	}

	// DELETE user profile
	async deleteUserProfile(id: string): Promise<boolean> {
		try {
			return await this.usersRepository.deleteUserProfile(Number(id));
			
		} catch (error) {
			console.error("Error while deleting user profile:", + error.message);
			throw new InternalServerErrorException("Failed to delete user profile")
		}
	}
}
