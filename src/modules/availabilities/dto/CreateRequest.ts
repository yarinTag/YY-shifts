import { IsBoolean, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateRequest {
  @IsBoolean()
  active: boolean;

  @IsOptional()
  @IsString()
  memo: string;

  @IsUUID()
  userId: string;

  @IsUUID()
  shiftId: string;
}
