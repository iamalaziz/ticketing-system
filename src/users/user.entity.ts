import { ApiProperty } from "@nestjs/swagger";

export class User {
	@ApiProperty()
	id?: number;

	@ApiProperty()
	username: string;

	@ApiProperty()
	firstname: string;

	@ApiProperty()
	lastname: string;

	@ApiProperty()
	date_of_birth: number;

	@ApiProperty()
	email: string;

	@ApiProperty()
	password: string;

	@ApiProperty()
	phone: string;
}
