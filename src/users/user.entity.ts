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
	birthdate: Date;

	@ApiProperty()
	email: string;

	@ApiProperty()
	password: string;

	@ApiProperty()
	phone: string;
}
