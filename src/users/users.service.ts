import { Injectable, Inject } from '@nestjs/common';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject('MYSQL_CONNECTION')
    private readonly mysqlConnection: any,
  ) {}

  async registerUser(userData: CreateUserDto): Promise<User> {
    try {
      const sql = "SELECT * FROM user WHERE username = ?;"
      const userExists = await this.mysqlConnection.query(sql, [userData.username]) 
      if(userExists) {
        throw new Error('User already exists. Please Login!')
      }
      await this.mysqlConnection.query(
        `INSERT INTO user (username, firstname, lastname, age, email, password, phone) VALUES (?, ?, ?, ?, ?, ?, ?);`,
        [...Object.values(userData)],
      );

      return userData;
    } catch (error) {
      throw new Error(`Error registering user: ${error}`);
    }
  }

  async loginUser(username: string, password: string): Promise<User | string> {
    try {
      const query = 'SELECT * FROM user WHERE username = ? AND password = ?';
      const [user] = await this.mysqlConnection.query(query, [
        username,
        password,
      ]);

      if (user.length > 0) {
        return user[0];
      }
    } catch (error) {
      console.error('Error logging in user:', error);
      throw error;
    }
  }

  async findByEmail(email: string): Promise<string> {
    const [foundEmail] = await this.mysqlConnection.execute(
      `SELECT email FROM user WHERE email = "${email}"`,
    );
    console.log(foundEmail);
    if (foundEmail) {
      return foundEmail;
    } else {
      return 'No such email';
    }
  }

  async getUsers(): Promise<User[]> {
    const [rows] = await this.mysqlConnection.execute('SELECT * FROM user');
    return rows as User[];
  }
}
