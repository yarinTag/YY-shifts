import { IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateRequest {
  @IsUUID()
  id: string;
  @IsOptional()
  @IsString()
  name: string;
  @IsOptional()
  @IsString()
  address: string;
  @IsOptional()
  active: boolean;
}
