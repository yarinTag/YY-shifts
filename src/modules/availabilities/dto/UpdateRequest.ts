import { IsUUID } from 'class-validator';

export class UpdateRequest {
  @IsUUID()
  id: string;

  active?: boolean;

  memo?: string;

  @IsUUID()
  userId: string;

  @IsUUID()
  shiftId: string;
}
