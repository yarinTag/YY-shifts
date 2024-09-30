import { IsUUID } from 'class-validator';

export class DeleteUserRequest {
  @IsUUID()
  id: string;
}