import { IsUUID } from 'class-validator';

export class UpdateRequest {
  @IsUUID()
  id: string;
  name: string;
  address: string;
}
