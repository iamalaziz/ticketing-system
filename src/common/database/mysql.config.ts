import { createConnection, } from 'mysql2/promise';

export const mysqlProvider = {
	provide: 'MYSQL_CONNECTION',
	useFactory: async () => {
		return await createConnection({
			host: process.env.MYSQL_HOST,
			user: process.env.MYSQL_USER,
			password: process.env.MYSQL_PASSWORD,
			database: process.env.MYSQL_DATABASE,
		});
	},
};
