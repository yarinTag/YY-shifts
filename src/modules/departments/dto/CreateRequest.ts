import { IsOptional, IsString, Length } from 'class-validator';

export class CreateRequest {
  @IsString()
  @Length(1, 50)
  name: string;
  @IsString()
  @IsOptional()
  address: string;
}
