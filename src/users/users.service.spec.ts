import { Test, TestingModule } from "@nestjs/testing";
import { UsersService } from "./users.service";
import { UsersRepository } from "./users.repository";
import {
	InternalServerErrorException,
	NotFoundException,
} from "@nestjs/common";
import { User } from "./user.entity";

describe("UsersService", () => {
	let service: UsersService;
	let repository: UsersRepository;

	const mockUserRepository = {
		getUserById: jest.fn(),
		createUser: jest.fn(),
		getAllUsers: jest.fn(),
	};

	const mockUser = {
		id: 32,
		username: "tom",
		firstname: "Tom",
		lastname: "Cat",
		age: 29,
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
			age: 25,
			email: "john.doe@example.com",
			password: "hashedpassword1",
			phone: "123-456-7890",
		},
		{
			id: 2,
			username: "jane",
			firstname: "Jane",
			lastname: "Doe",
			age: 28,
			email: "jane.doe@example.com",
			password: "hashedpassword2",
			phone: "098-765-4321",
		},
	];

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UsersService,
				{ provide: UsersRepository, useValue: mockUserRepository },
			],
		}).compile();

		service = module.get<UsersService>(UsersService);
		repository = module.get<UsersRepository>(UsersRepository);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});

	// Create User
	describe("createUser", () => {
		it("should return true if user creation is successful", async () => {
			mockUserRepository.createUser.mockResolvedValue(true);

			const result = await service.createUser(mockUser);
			expect(result).toBe(true);
			expect(mockUserRepository.createUser).toHaveBeenCalledWith(mockUser);
		});

		it("should throw an InternalServerErrorException if user creation fails", async () => {
			const errorMessage = "Database error";
			mockUserRepository.createUser.mockRejectedValue(new Error(errorMessage));

			await expect(service.createUser(mockUser)).rejects.toThrow(
				InternalServerErrorException
			);
		});
	});

	//Get All Users
	describe("getAllUsers", () => {
		it("should return an array of users if successful", async () => {
			mockUserRepository.getAllUsers.mockResolvedValue(mockUsers);

			const result = await service.getAllUsers();
			expect(result).toEqual(mockUsers);
			expect(mockUserRepository.getAllUsers).toHaveBeenCalled();
		});

		it("should return an empty array if no users are found", async () => {
			mockUserRepository.getAllUsers.mockResolvedValue([]);

			const result = await service.getAllUsers();
			expect(result).toEqual([]);
			expect(mockUserRepository.getAllUsers).toHaveBeenCalled();
		});

		it("should throw an InternalServerErrorException if fetching users fails", async () => {
			const errorMessage = "Database error";
			mockUserRepository.getAllUsers.mockRejectedValue(new Error(errorMessage));

			await expect(service.getAllUsers()).rejects.toThrow(
				InternalServerErrorException
			);
		});

		it("should handle unexpected data format gracefully", async () => {
			mockUserRepository.getAllUsers.mockResolvedValue([
				{
					id: "1",
					name: "John Doe",
					age: "twenty-five",
				},
			]);

			const result = await service.getAllUsers();
			expect(result).toEqual([
				{
					id: "1",
					name: "John Doe",
					age: "twenty-five",
				},
			]);
			expect(mockUserRepository.getAllUsers).toHaveBeenCalled();
		});

		it("should handle null response from repository gracefully", async () => {
			mockUserRepository.getAllUsers.mockResolvedValue(null);

			const result = await service.getAllUsers();
			expect(result).toBeNull();
			expect(mockUserRepository.getAllUsers).toHaveBeenCalled();
		});

		it("should handle repository throwing a custom error", async () => {
			class CustomError extends Error {}
			mockUserRepository.getAllUsers.mockRejectedValue(
				new CustomError("Custom error")
			);

			await expect(service.getAllUsers()).rejects.toThrow(
				InternalServerErrorException
			);
		});
	});

	// Get User By ID
	describe("getUserById", () => {
		it("should return a user if found", async () => {
			mockUserRepository.getUserById.mockResolvedValue(mockUser);

			const result = await service.getUserById(32);
			expect(result).toEqual(mockUser);
		});

		it("should throw a NotFoundException if user not found", async () => {
			mockUserRepository.getUserById.mockResolvedValue(null);

			try {
				await service.getUserById(32);
			} catch (error) {
				expect(error).toBeInstanceOf(NotFoundException);
				expect(error.message).toBe("User with ID 32 not found");
			}
		});

		it("should propagate repository errors", async () => {
			const errorMessage = "Database error";
			mockUserRepository.getUserById.mockRejectedValue(new Error(errorMessage));

			try {
				await service.getUserById(32);
			} catch (error) {
				expect(error.message).toBe(errorMessage);
			}
		});
	});
});
