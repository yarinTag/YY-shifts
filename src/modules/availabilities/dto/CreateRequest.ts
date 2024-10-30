import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateRequest {
  @IsOptional()
  @IsString()
  memo: string;

  @IsUUID()
  @IsOptional()
  userId: string;

  @IsUUID()
  shiftId: string;
}
