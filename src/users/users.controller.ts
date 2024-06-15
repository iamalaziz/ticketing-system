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
import { ConflictException } from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiCreatedResponse,
    ApiOperation,
    ApiParam,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}
    // GET all users list
    @Get()
    @ApiOperation({ summary: 'Get all users list' })
    @ApiResponse({
        status: 200,
        description: 'Users list',
        type: User,
    })
    @ApiResponse({
        status: 404,
        description: 'Could not fetch users list',
    })
    async getAllUsers(): Promise<User[]> {
        return await this.usersService.getAllUsers();
    }

    // does email exists
    @Get('email/:email')
    async existsEmail(@Param('email') email: string): Promise<Boolean> {
        try {
            return await this.usersService.existsEmail(email);
        } catch (error) {
            throw new Error(`Error: ${error}`);
        }
    }

    // GET user by ID
    @Get(':email')
    @ApiOperation({ summary: 'Get user by email' })
    @ApiParam({
        name: 'email',
        type: Number,
        description: 'User data',
    })
    @ApiResponse({
        status: 200,
        description: 'The found user',
        type: User,
    })
    @ApiResponse({
        status: 404,
        description: 'User not found',
    })
    async getUserBy(@Param('email') email: string): Promise<User> {
        return await this.usersService.getUserBy(email);
    }

    // PATCH update user data
    @Patch(':id')
    async updateUserData(
        @Param('id') id: number,
        @Body() updateData: User
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
    @ApiResponse({
        status: 400,
        description: 'Failed to delete user data',
    })
    @ApiResponse({
        status: 404,
        description: 'User not found',
    })
    async deleteUserProfile(@Param('id') id: string): Promise<boolean> {
        try {
            const res = await this.usersService.deleteUserProfile(id);

            return res;
        } catch (error) {
            throw new BadRequestException('Failed to delete user data');
        }
    }
}
