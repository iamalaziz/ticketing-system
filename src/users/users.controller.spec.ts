import { Test, TestingModule, } from '@nestjs/testing';
import { UsersController, } from './users.controller';
import { UsersService, } from './users.service';
import { ConfigService, } from '@nestjs/config';
import { User, } from './user.entity';
import { UsersRepository, } from './users.repository';
import { JwtService, } from '@nestjs/jwt';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('UsersController', () => {
	let usersController: UsersController;
	let usersService: UsersService;

	const mockUser = {
		id: 32,
		username: 'tom',
		firstname: 'Tom',
		lastname: 'Cat',
		age: 29,
		email: 'tom@roof.gmail',
		password: '1234',
		phone: '010-1289-1221',
	};
	const mockUsers: User[] = [
		{
			id: 1,
			username: 'john',
			firstname: 'John',
			lastname: 'Doe',
			age: 25,
			email: 'john.doe@example.com',
			password: 'hashedpassword1',
			phone: '123-456-7890',
		},
		{
			id: 2,
			username: 'jane',
			firstname: 'Jane',
			lastname: 'Doe',
			age: 28,
			email: 'jane.doe@example.com',
			password: 'hashedpassword2',
			phone: '098-765-4321',
		},
	];
	// const mockUsersService = {};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [UsersController,],
			providers: [
				UsersService,
				UsersRepository,
				ConfigService,
				JwtService,
				{
					provide: 'MYSQL_CONNECTION',
					useValue: { query: jest.fn().mockResolvedValue([]), },
				},
			],
		}).compile();

		usersController = module.get<UsersController>(UsersController);
		usersService = module.get<UsersService>(UsersService);
	});

	it('should be defined', () => {
		expect(usersController).toBeDefined();
	});

	describe('getAllUsers', () => {
		it('should return an array of users', async () => {
			jest.spyOn(usersService, 'getAllUsers').mockResolvedValue(mockUsers);
			const result = await usersController.getAllUsers();
			expect(result).toEqual(mockUsers);
		});

		it('should return an empty array when no users found', async () => {
            jest.spyOn(usersService, 'getAllUsers').mockResolvedValue([]);
            const result = await usersController.getAllUsers();
            expect(result).toEqual([]);
        });

		it('should handle null response from service', async () => {
            jest.spyOn(usersService, 'getAllUsers').mockResolvedValue(null);
            const result = await usersController.getAllUsers();
            expect(result).toEqual([]);
        });

        it('should handle undefined response from service', async () => {
            jest.spyOn(usersService, 'getAllUsers').mockResolvedValue(undefined);
            const result = await usersController.getAllUsers();
            expect(result).toEqual([]);
        });


		it('should handle errors', async () => {
			const errorMessage = 'Failed to get users';
			jest.spyOn(usersService, 'getAllUsers').mockRejectedValue(new Error(errorMessage));
			try {
				await usersController.getAllUsers();
			} catch (error) {
				expect(error.message).toBe(errorMessage);
			}
		});

		it('should throw an HttpException for service errors', async () => {
            const errorMessage = 'Failed to get users';
            jest.spyOn(usersService, 'getAllUsers').mockRejectedValue(new Error(errorMessage));
            try {
                await usersController.getAllUsers();
            } catch (error) {
                expect(error).toBeInstanceOf(HttpException);
                expect(error.getStatus()).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
                expect(error.message).toBe(errorMessage);
            }
        });
	});

	

	describe('getUserById', () => {
		it('should return a user by ID', async () => {
			jest.spyOn(usersService, 'getUserById').mockResolvedValue(mockUser);

			const result = await usersController.getUserById(mockUser.id);
			expect(result).toEqual(mockUser);
		});
	});
});
