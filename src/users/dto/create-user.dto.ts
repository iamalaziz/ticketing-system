import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  Length,
  Validate,
} from 'class-validator';
import { UniqueEmailValidator } from 'src/validators/unique-email.validator';

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
  @Validate(UniqueEmailValidator)
  email: string;

  @ApiProperty({
    description: "Password",
    example: "0123456789",
    minimum: 8,
    maximum: 24
  })
  @IsNotEmpty()
  @Length(8, 24)
  password: string;
  age: number;
  phone: string;
}
