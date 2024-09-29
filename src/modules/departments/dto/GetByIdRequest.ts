import { IsOptional, IsUUID } from 'class-validator';

export class GetByIdRequest {
  @IsUUID()
  @IsOptional()
  id: string;
}
