import { IsString, Length, IsEmail, IsPhoneNumber } from 'class-validator';

export class CreateUserRequest {
  @IsString()
  @Length(1, 50)
  name: string;
  @IsEmail()
  email: string;
  @IsPhoneNumber('IL')
  phone: string;
}
