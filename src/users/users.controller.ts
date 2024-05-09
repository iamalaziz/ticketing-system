import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Param
} from '@nestjs/common';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  
  @Post('register')
  async registerUser(@Body() userData: CreateUserDto): Promise<any> {
    try {
      const res = await this.usersService.registerUser(userData);
      return res
    } catch (error) {
      throw new BadRequestException('Failed to create user');
    }
  }

  @Get()
  async getAllUsers(): Promise<User[]> {
    try {
      const res = await this.usersService.getAllUsers();
      return res
    } catch (error) {
      throw new BadRequestException('Failed to fetch users');
    }
  }

  @Get('email')
  async findByEmail(@Param('email') email: string): Promise<string> {
    console.log(email)
    const res = await this.usersService.findByEmail(email);
    return res;
  }

}
