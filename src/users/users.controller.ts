import {
	BadRequestException,
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Put,
} from "@nestjs/common";
import { User } from "./user.entity";
import { UsersService } from "./users.service";
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("Users")
@Controller("users")
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	private isValidId(id: string): boolean {
		return !isNaN(Number(id)) && Number(id) > 0;
	}
	// GET all users list
	@Get()
	@ApiOperation({ summary: "Get all users list" })
	@ApiResponse({
		status: 200,
		description: "Users list",
		type: User,
	})
	@ApiResponse({
		status: 404,
		description: "Could not fetch users list",
	})
	async getAllUsers(): Promise<User[]> {
		return await this.usersService.getAllUsers();
	}

	// does email exist
	@Get("email-exists/:email")
	async existsEmail(@Param("email") email: string): Promise<boolean> {
		try {
			return await this.usersService.existsEmail(email);
		} catch (error) {
			throw new Error(`Error: ${error}`);
		}
	}

	// GET user by email
	@Get(":id")
	@ApiOperation({ summary: "Get user by id" })
	@ApiParam({
		name: "id",
		type: Number,
		description: "User data",
	})
	@ApiResponse({
		status: 200,
		description: "The found user",
		type: User,
	})
	@ApiResponse({
		status: 404,
		description: "User not found",
	})
	async getUserById(@Param("id") id: string): Promise<User> {
		// Validate the ID format (assuming it should be a number)
		if (!this.isValidId(id)) {
			throw new BadRequestException("Invalid ID format");
		}

		return await this.usersService.getUserById(Number(id));
	}

	// GET user by email
	@Get("email/:email")
	@ApiOperation({ summary: "Get user by email" })
	@ApiParam({
		name: "email",
		type: String,
		description: "User data",
	})
	@ApiResponse({
		status: 200,
		description: "The found user",
		type: User,
	})
	@ApiResponse({
		status: 404,
		description: "User not found",
	})
	async getUserByEmail(@Param("email") email: string): Promise<User> {
		return await this.usersService.getUserByEmail(email);
	}

	// PUT update user data
	@Put(":id")
	@ApiOperation({ summary: "Update user data" })
	async updateUserData(
		@Param("id") id: number,
		@Body() updateData: User,
	): Promise<User> {
		return await this.usersService.updateUserData(id, updateData);
	}

	// DELETE user profile
	@Delete(":id")
	@ApiOperation({ summary: "Delete user profile by ID" })
	@ApiParam({
		name: "id",
		type: "string",
		description: "The ID of the user to delete",
		required: true,
	})
	@ApiResponse({
		status: 200,
		description: "User profile deleted successfully",
		type: Boolean,
	})
	@ApiResponse({
		status: 400,
		description: "Failed to delete user data",
	})
	@ApiResponse({
		status: 404,
		description: "User not found",
	})
	async deleteUserProfile(@Param("id") id: string): Promise<boolean> {
		return await this.usersService.deleteUserProfile(id);
	}
}
