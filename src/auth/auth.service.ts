import {
    ConflictException,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { User } from '../users/user.entity';
import { AuthRepository } from './auth.repository';
import { AuthLoginDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly authRepository: AuthRepository,
        private readonly usersService: UsersService
    ) {}
    // POST auth user
    async validateLogin({
        email,
        password,
    }: AuthLoginDto): Promise<Partial<User>> {
        /* check if user exists */
        const user = await this.usersService.getUserBy(email);
        if (user === undefined) {
            throw new NotFoundException(`User with email ${email} not found`);
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid password!');
        }
        const {password: _, id, ...res} = user
        return res;
    }

    // POST register user
    async registerUser(userData: CreateUserDto) {
        /* check if email is not already registered */
        const existsEmail = await this.usersService.existsEmail(userData.email);
        if (existsEmail) {
            throw new ConflictException(
                'Email is already registered. Please Login!'
            );
        }
        /* hash password */
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(userData.password, salt);
        userData.password = hashedPassword;
        const result = await this.usersService.createUser(userData);
        const { password, ...user } = result;
        return user;
    }
}
