import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  Length,
  Validate,
} from 'class-validator';
import { UniqueEmailValidator } from 'src/validators/unique-email.validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  @Validate(UniqueEmailValidator)
  email: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  firstname: string;

  @IsNotEmpty()
  lastname: string;

  @IsNotEmpty()
  @Length(8, 24)
  password: string;
  age: number;
  phone: string;
}
