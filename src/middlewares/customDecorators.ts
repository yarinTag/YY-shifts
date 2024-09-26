import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
} from 'class-validator';
import jwt from 'jsonwebtoken';

import { dataSource } from '../db';
import { User } from '../modules/users/user.schema';

@ValidatorConstraint({ async: true })
export class IsUniqueConstraint implements ValidatorConstraintInterface {
  private userRepository = dataSource.getRepository(User);

  async validate(value: string, args: ValidationArguments) {
    const property = args.property;
    const dto = args.object as {cookie:string};
    let userId: string;
    try {
      const decodedToken = jwt.verify(
        dto.cookie.split("=")[1],
        process.env.JWT_SECRET ?? ''
      ) as User;
      userId = decodedToken.id;
    } catch (error) {
      console.error('Failed to decode token:', error);
      return false;
    }

    const user = await this.userRepository.findOne({
      where: {
        [property]: value,
      },
    });
    if (user && user.id !== userId) {
      return false;
    }
    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} ${args.value} is already in use`;
  }
}

export function IsUnique(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUniqueConstraint,
    });
  };
}
