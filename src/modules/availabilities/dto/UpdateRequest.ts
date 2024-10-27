import { IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateRequest {
  @IsOptional()
  @IsString()
  memo: string;

  @IsUUID()
  userId: string;

  @IsUUID()
  shiftId: string;
}
