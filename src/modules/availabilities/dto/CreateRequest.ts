import { IsUUID } from 'class-validator';

export class CreateRequest {
  active: boolean;

  memo?: string;

  @IsUUID()
  userId: string;

  @IsUUID()
  shiftId: string;
}
