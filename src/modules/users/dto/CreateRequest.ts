import {
  IsString,
  Length,
  IsEmail,
  IsPhoneNumber,
  MinLength,
} from 'class-validator';

import { Gender } from '../user.schema';
import { IsUnique } from '../../../middlewares/customDecorators';

export class CreateUserRequest {
  @IsString()
  @Length(1, 50)
  name: string;

  @IsEmail({}, { message: 'Invalid email format' })
  @IsUnique({ message: 'Email is already in use' })
  email: string;

  @IsPhoneNumber('IL', { message: 'Invalid phone number format' })
  @IsUnique({ message: 'Phone number is already in use' })
  phone: string;

  @IsString()
  gender: Gender;
  
  @MinLength(8)
  password: string;
}
