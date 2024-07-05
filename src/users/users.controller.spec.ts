import { Test, TestingModule } from "@nestjs/testing";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { ConfigService } from "@nestjs/config";
import { User } from "./user.entity";
import { UsersRepository } from "./users.repository";
import { JwtService } from "@nestjs/jwt";
import {
	BadRequestException,
	HttpException,
	HttpStatus,
	NotFoundException,
} from "@nestjs/common";

describe("UsersController", () => {
	let usersController: UsersController;
	let usersService: UsersService;

	const mockUser = {
		id: 32,
		username: "tom",
		firstname: "Tom",
		lastname: "Cat",
		date_of_birth: 29,
		email: "tom@roof.gmail",
		password: "1234",
		phone: "010-1289-1221",
	};
	const mockUsers: User[] = [
		{
			id: 1,
			username: "john",
			firstname: "John",
			lastname: "Doe",
			date_of_birth: 25,
			email: "john.doe@example.com",
			password: "hashedpassword1",
			phone: "123-456-7890",
		},
		{
			id: 2,
			username: "jane",
			firstname: "Jane",
			lastname: "Doe",
			date_of_birth: 28,
			email: "jane.doe@example.com",
			password: "hashedpassword2",
			phone: "098-765-4321",
		},
	];
	// const mockUsersService = {};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [UsersController],
			providers: [
				UsersService,
				UsersRepository,
				ConfigService,
				JwtService,
				{
					provide: "MYSQL_CONNECTION",
					useValue: {
						query: jest
							.fn()
							.mockResolvedValue([]),
					},
				},
			],
		}).compile();

		usersController = module.get<UsersController>(UsersController);
		usersService = module.get<UsersService>(UsersService);
	});

	it("should be defined", () => {
		expect(usersController).toBeDefined();
	});

	describe("getAllUsers", () => {
		it("should return an array of users", async () => {
			jest.spyOn(
				usersService,
				"getAllUsers",
			).mockResolvedValue(mockUsers);
			const result = await usersController.getAllUsers();
			expect(result).toEqual(mockUsers);
		});

		it("should return an empty array when no users found", async () => {
			jest.spyOn(
				usersService,
				"getAllUsers",
			).mockResolvedValue([]);
			const result = await usersController.getAllUsers();
			expect(result).toEqual([]);
		});

		it("should handle null response from service", async () => {
			jest.spyOn(
				usersService,
				"getAllUsers",
			).mockResolvedValue(null);
			const result = await usersController.getAllUsers();
			expect(result).toEqual([]);
		});

		it("should handle undefined response from service", async () => {
			jest.spyOn(
				usersService,
				"getAllUsers",
			).mockResolvedValue(undefined);
			const result = await usersController.getAllUsers();
			expect(result).toEqual([]);
		});

		it("should handle errors", async () => {
			const errorMessage = "Failed to get users";
			jest.spyOn(
				usersService,
				"getAllUsers",
			).mockRejectedValue(new Error(errorMessage));
			try {
				await usersController.getAllUsers();
			} catch (error) {
				expect(error.message).toBe(errorMessage);
			}
		});

		it("should throw an HttpException for service errors", async () => {
			const errorMessage = "Failed to get users";
			jest.spyOn(
				usersService,
				"getAllUsers",
			).mockRejectedValue(new Error(errorMessage));
			try {
				await usersController.getAllUsers();
			} catch (error) {
				expect(error).toBeInstanceOf(HttpException);
				expect(error.getStatus()).toBe(
					HttpStatus.INTERNAL_SERVER_ERROR,
				);
				expect(error.message).toBe(errorMessage);
			}
		});
	});

	describe("getUserById", () => {
		it("should throw a BadRequestException for an invalid ID format", async () => {
			const invalidId = "invalid-id";
			try {
				await usersController.getUserById(invalidId);
			} catch (error) {
				expect(error).toBeInstanceOf(
					BadRequestException,
				);
				expect(error.message).toBe("Invalid ID format");
			}
		});

		it("should return a user if found", async () => {
			jest.spyOn(
				usersService,
				"getUserById",
			).mockResolvedValue(mockUser);
			const result = await usersController.getUserById("1");
			expect(result).toEqual(mockUser);
		});

		it("should throw a NotFoundException if user not found", async () => {
			jest.spyOn(
				usersService,
				"getUserById",
			).mockResolvedValue(null);
			try {
				await usersController.getUserById("1");
			} catch (error) {
				expect(error).toBeInstanceOf(NotFoundException);
				expect(error.message).toBe("User not found");
			}
		});

		it("should throw an HttpException for service errors", async () => {
			const errorMessage = "Failed to get user";
			jest.spyOn(
				usersService,
				"getUserById",
			).mockRejectedValue(new Error(errorMessage));
			try {
				await usersController.getUserById("1");
			} catch (error) {
				expect(error).toBeInstanceOf(HttpException);
				expect(error.getStatus()).toBe(
					HttpStatus.INTERNAL_SERVER_ERROR,
				);
				expect(error.message).toBe(errorMessage);
			}
		});
	});
});
