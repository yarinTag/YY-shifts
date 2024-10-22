import { IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateRequest {
  @IsUUID()
  id: string;

  @IsOptional()
  @IsString()
  memo: string;

  @IsUUID()
  userId: string;

  @IsUUID()
  shiftId: string;
}
