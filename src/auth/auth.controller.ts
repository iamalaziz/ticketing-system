import {
    Post,
    Body,
    BadRequestException,
    Controller,
    Req,
    NotFoundException,
    UnauthorizedException,
    ConflictException,
    UseGuards,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiBadRequestResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    // POST Login user
    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Body() loginData: AuthLoginDto): Promise<any> {
        return await this.authService.validateLogin(loginData);
    }

    // Register User
    @Post('register')
    async registerUser(@Body() userData: CreateUserDto): Promise<any> {
        return await this.authService.registerUser(userData);
    }
}
