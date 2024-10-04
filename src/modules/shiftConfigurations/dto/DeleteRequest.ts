import { IsUUID } from 'class-validator';

export class DeleteRequest {
  @IsUUID()
  id: string;
}