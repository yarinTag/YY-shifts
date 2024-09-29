import { IsPhoneNumber, IsString, Min, MinLength } from 'class-validator';

export class SignInRequest {
  @IsString()
  @IsPhoneNumber('IL', { message: 'Invalid phone number format' })
  phone: string;
  @MinLength(8)
  password: string;
}
