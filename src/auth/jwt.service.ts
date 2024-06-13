import * as jwt from 'jsonwebtoken';
import { Injectable, Inject } from '@nestjs/common';
import { default as config } from '../config';

@Injectable()
export class JWTService {
  constructor(
    @Inject('MYSQL_CONNECTION')
    private readonly mysqlConnection: any
  ) {}

  // !later include roles too
  async createToken(email: string) {
    const expiresIn = config.jwt.expiresIn,
      secretOrKey = config.jwt.secretOrKey;
    const userInfo = { email: email };
    const token = jwt.sign(userInfo, secretOrKey, { expiresIn });
    return { expires_in: expiresIn, access_token: token };
  }

  //Validate user for
  async validateUser(signedUser) {
    let [userFromDB] = await this.mysqlConnection.query(
      `SELECT email from USER WHERE email = '${signedUser.email}'`
    );
    if (userFromDB) {
      return userFromDB;
    }

    return null;
  }
}
