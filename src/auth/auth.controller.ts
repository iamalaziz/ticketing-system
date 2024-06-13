import { Post, Body, BadRequestException, Controller } from '@nestjs/common';
import { ApiCreatedResponse, ApiBadRequestResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Login } from './interfaces/login.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  // POST Login user
  @Post('email/login')
  @ApiCreatedResponse({
    description: 'User logged in',
  })
  @ApiBadRequestResponse({ description: 'Login failed!' })
  async login(@Body() userData: Login): Promise<any> {
    try {
      const res = await this.authService.validateLogin(userData);

      return res;
    } catch (error) {
      throw new BadRequestException('Failed to login');
    }
  }
}
