import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiFoundResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Register User
  @Post('register')
  @ApiCreatedResponse({
    description: 'Created user object as responce',
    type: User,
  })
  @ApiBadRequestResponse({
    description: 'User cannot register. Try again',
  })
  async registerUser(@Body() userData: CreateUserDto): Promise<any> {
    try {
      const res = await this.usersService.registerUser(userData);
      return res;
    } catch (error) {
      throw new BadRequestException('Failed to create user');
    }
  }

  // POST Login user
  @Post('login')
  @ApiCreatedResponse({
    description: 'User logged in',
    type: User,
  })
  @ApiBadRequestResponse({
    description: 'Login failed!',
  })
  async loginUser(@Body() userData: any): Promise<any> {
    try {
      const res = await this.usersService.loginUser(userData);
      return res;
    } catch (error) {
      throw new BadRequestException('Failed to login');
    }
  }

  // PATCH update user data

  @Patch(':id')
  async updateUserData(
    @Param('id') id: number,
    @Body() updateData: User,
  ): Promise<User> {
    return await this.usersService.updateUserData(id, updateData);
  }

  // DELETE user profile
  @Delete(':id')
  @ApiOperation({ summary: 'Delete user profile by ID' })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'The ID of the user to delete',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'User profile deleted successfully',
    type: Boolean,
  })
  @ApiResponse({ status: 400, description: 'Failed to delete user data' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async deleteUserProfile(@Param('id') id: string): Promise<Boolean> {
    try {
      const res = await this.usersService.deleteUserProfile(id);
      return res;
    } catch (error) {
      throw new BadRequestException('Failed to delete user data');
    }
  }
}
