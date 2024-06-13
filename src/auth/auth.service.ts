import { Injectable } from '@nestjs/common';
import { User } from '../users/user.entity';
import { AuthRepository } from './auth.repository';

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}
  // POST auth user
  async validateLogin(userData: Partial<User>): Promise<User> {
    const { email, password } = userData;
    const res = await this.authRepository.validateLogin(email, password);

    return res;
  }
}
