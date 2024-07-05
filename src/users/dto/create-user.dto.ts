import { IsEmail, IsNotEmpty, Length } from "class-validator";

export class CreateUserDto {
	@IsNotEmpty()
	username: string;

	@IsNotEmpty()
	@IsEmail()
	email: string;

	@IsNotEmpty()
	@Length(8, 24)
	password: string;
	date_of_birth: Date;
}
