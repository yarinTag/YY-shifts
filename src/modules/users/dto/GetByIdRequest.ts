import { IsUUID, IsOptional } from 'class-validator';
import { Role } from '../../../types/enum/Role';

export class GetByIdRequest {
  @IsOptional()
  @IsUUID()
  departmentId?: string;

  @IsOptional()
  @IsUUID()
  userId: string;

  @IsOptional()
  role?: Role;
}
