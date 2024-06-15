import { ConflictException, Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(private readonly usersRepository: UsersRepository) {}

    async createUser(userData: CreateUserDto): Promise<User> {
        return await this.usersRepository.createUser(userData);
    }

    // GET all users list
    async getAllUsers(): Promise<User[]> {
        return await this.usersRepository.getAllUsers();
    }

    // GET user by ID, email
    async getUserBy(email: string): Promise<User> {
        return await this.usersRepository.getUserBy(email);
    }

    async existsEmail(email: string): Promise<Boolean> {
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
