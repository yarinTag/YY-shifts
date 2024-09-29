import { IsPhoneNumber, IsString, MinLength } from "class-validator";

export class SingInRequest {
    @MinLength(8)
    password: string;
    @IsString()
    @IsPhoneNumber('IL')
    phone: string;
  }