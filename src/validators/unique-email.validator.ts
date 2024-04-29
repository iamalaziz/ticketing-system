import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator'
import { Injectable } from '@nestjs/common'
import { UsersService } from '../users/users.service'

@ValidatorConstraint({ name: 'isEmailUnique', async: true })
@Injectable()
export class UniqueEmailValidator implements ValidatorConstraintInterface {
  constructor(private readonly usersService: UsersService) {
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return `${validationArguments.value} is taken, please try another`
  }

  async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {
    const result = await this.usersService.findByEmail(value)
    return !result
  }
}