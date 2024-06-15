import { Injectable, Inject, HttpException } from '@nestjs/common';
import { User } from '../users/user.entity';
import { AuthLoginDto } from './dto/auth.dto';

@Injectable()
export class AuthRepository {
    constructor(
        @Inject('MYSQL_CONNECTION')
        private readonly mysqlConnection: any
    ) {}

}
