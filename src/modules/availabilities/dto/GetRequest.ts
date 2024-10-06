import { IsUUID } from 'class-validator';

export class GetRequest {
  @IsUUID()
  id: string;

  @IsUUID()
  shiftId: string;
}
