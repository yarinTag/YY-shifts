import {
  IsOptional,
  IsString,
  Length,
  IsEmail,
  IsPhoneNumber,
} from 'class-validator';

import { IsUnique } from '../../../decorators/customDecorators';
import { Gender } from '../../../types/enum/Gender';

export class UpdateUserRequest {
  @IsOptional()
  @IsString()
  @Length(3, 50)
  name?: string;

  @IsOptional()
  @IsEmail({}, { message: 'Invalid email format' })
  @IsUnique({ message: 'Email is already in use' })
  email?: string;

  @IsOptional()
  @IsPhoneNumber('IL', { message: 'Invalid phone number format' })
  @IsUnique({ message: 'Phone number is already in use' })
  phone?: string;

  @IsOptional()
  @IsString()
  gender?: Gender;
}
