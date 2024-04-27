import { Injectable, Inject } from '@nestjs/common';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject('MYSQL_CONNECTION')
    private readonly mysqlConnection: any,
  ) {}

  async registerUser(userData: CreateUserDto): Promise<User[]> {
    const { id, username, firstname, lastname, age, email, password, phone } =
      userData;
    console.log(userData);
    const rows = await this.mysqlConnection.execute(
      `INSERT INTO user (id, username, firstname, lastname, age, email, password, phone)
      VALUES 
          (${id}, ${username}, ${firstname}, ${lastname}, ${age}, ${email}, ${password}, ${phone});`,
    );
    console.log(rows);
    return rows as User[];
  }

  async findByEmail(email: string): Promise<string> {
    const [foundEmail] = await this.mysqlConnection.execute(
      `SELECT email FROM user WHERE email = "${email}"`,
    );
    console.log(foundEmail)
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
