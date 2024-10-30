import { IsOptional, IsUUID } from 'class-validator';

export class DeleteRequest {
  @IsUUID()
  @IsOptional()
  userId: string;

  @IsUUID()
  shiftId: string;
}
