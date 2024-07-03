import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { NotFoundException } from '@nestjs/common';
import { User } from './user.entity';

describe('UsersService', () => {
    let service: UsersService;
    let repository: UsersRepository;

    const mockUserRepository = {
        getUserById: jest.fn(),
        createUser: jest.fn(),

    };

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

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('getUserById', () => {
        it('should return a user if found', async () => {
            mockUserRepository.getUserById.mockResolvedValue(mockUser);

            const result = await service.getUserById(32);
            expect(result).toEqual(mockUser);
        });

        it('should throw a NotFoundException if user not found', async () => {
            mockUserRepository.getUserById.mockResolvedValue(null);

            try {
                await service.getUserById(32);
            } catch (error) {
                expect(error).toBeInstanceOf(NotFoundException);
                expect(error.message).toBe('User with ID 32 not found');
            }
        });

        it('should propagate repository errors', async () => {
            const errorMessage = 'Database error';
            mockUserRepository.getUserById.mockRejectedValue(new Error(errorMessage));

            try {
                await service.getUserById(32);
            } catch (error) {
                expect(error.message).toBe(errorMessage);
            }
        });
    });

    describe('createUser', () => {
        it('should return true if user creation is successful', async () => {
            mockUserRepository.createUser.mockResolvedValue(true);

            const result = await service.createUser(mockUser);
            expect(result).toBe(true);
            expect(mockUserRepository.createUser).toHaveBeenCalledWith(mockUser);
        });

        it('should propagate repository errors', async () => {
            const errorMessage = 'Database error';
            mockUserRepository.createUser.mockRejectedValue(new Error(errorMessage));

            try {
                await service.createUser(mockUser);
            } catch (error) {
                expect(error.message).toBe(errorMessage);
            }
        });
    });
});
