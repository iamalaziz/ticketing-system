import { Injectable, Inject } from '@nestjs/common';
import { User } from '../users/user.entity';

@Injectable()
export class AuthRepository {
  constructor(
    @Inject('MYSQL_CONNECTION')
    private readonly mysqlConnection: any
  ) {}

  async validateLogin(email: string, password: string): Promise<User> {
    try {
      const query = 'SELECT * FROM user WHERE email = ? AND password = ?';
      const user = await this.mysqlConnection.query(query, [
        email,
        password,
      ]);

      if (user.length > 0) {
        return user[1];
      }
    } catch (error) {
      console.error('Error logging in user:', error);
      throw error;
    }
  }
}
