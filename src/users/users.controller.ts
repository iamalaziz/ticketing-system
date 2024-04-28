import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
  Param,
} from '@nestjs/common';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async registerUser(@Body() userData: CreateUserDto): Promise<any> {
    try {
      const res = await this.usersService.registerUser(userData);
      return { message: 'User created!', user: res };
    } catch (error) {
      throw new BadRequestException(
        'Failed to create user. Error: ' + error.message,
      );
    }
  }

  @Post('login')
  async login(@Body() { username, password }): Promise<any> {
    try {
      const user = await this.usersService.loginUser(username, password);

      if (user) {
        return { message: 'Login successful!', user: user };
      } else {
        return { message: 'Username or password is wrong', user: null };
      }
    } catch (error) {
      throw new Error(`Error logging in user:: ${error}`);
    }
  }
  
  @Get('email')
  async findByEmail(@Param('email') email: string): Promise<string> {
    console.log(email);
    const res = await this.usersService.findByEmail(email);
    return res;
  }
}
