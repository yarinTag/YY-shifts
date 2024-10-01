import {
  IsString,
  Length,
  IsEmail,
  IsPhoneNumber,
  MinLength,
  IsUUID,
} from 'class-validator';

import { IsUnique } from '../../../decorators/customDecorators';
import { Gender } from '../../../types/enum/Gender';

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
