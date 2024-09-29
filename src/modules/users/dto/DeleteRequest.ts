import { IsPhoneNumber } from 'class-validator';

export class DeleteUserRequest {
  @IsPhoneNumber('IL')
  phone: string;
}