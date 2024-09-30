import {
  IsString,
  Length,
  IsEmail,
  IsPhoneNumber,
  MinLength,
  IsUUID,
} from 'class-validator';

import { Gender } from '../user.schema';
import { IsUnique } from '../../../middlewares/customDecorators';

export class CreateUserRequest {
  @IsString()
  @Length(1, 50)
  name: string;

  @IsUUID()
  departmentId: string;

  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsPhoneNumber('IL', { message: 'Invalid phone number format' })
  phone: string;

  @IsString()
  gender: Gender;

  @MinLength(8)
  password: string;
}
