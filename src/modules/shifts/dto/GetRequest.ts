import { IsUUID, ValidateIf } from 'class-validator';

export class GetRequest {
  @ValidateIf((o) => !o.workCycleId && !o.userId)
  @IsUUID()
  id?: string;

  @ValidateIf((o) => !o.workCycleId && !o.id)
  @IsUUID()
  userId?: string;

  @ValidateIf((o) => !o.userId && !o.id)
  @IsUUID()
  workCycleId?: string;
}
