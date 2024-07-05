import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, Length } from "class-validator";

export class CreateUserDto {
	@ApiProperty({
		description: "Nickname of user",
		example: "JayKhakim",
	})
	@IsNotEmpty()
	username: string;

	@ApiProperty({
		description: "Firstname",
		example: "Javokhirbek",
	})
	@IsNotEmpty()
	firstname: string;

	@ApiProperty({
		description: "Lastname",
		example: "Khakimjonov",
	})
	@IsNotEmpty()
	lastname: string;

	@ApiProperty({
		description: "Email",
		example: "mgmediaja@gmail.com",
	})
	@IsNotEmpty()
	@IsEmail()
	email: string;

	@ApiProperty({
		description: "Password",
		example: "0123456789",
		minimum: 8,
		maximum: 24,
	})
	@IsNotEmpty()
	@Length(8, 24)
	password: string;
	age: number;
	phone: string;
}
