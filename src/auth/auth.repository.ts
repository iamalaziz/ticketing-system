import { Injectable, Inject, } from '@nestjs/common';

@Injectable()
export class AuthRepository {
	constructor(
        @Inject('MYSQL_CONNECTION')
        private readonly mysqlConnection: any
	) {}

}
