import { IsNumberString, IsUUID, ValidateIf } from 'class-validator';

export class FindBy {
  @ValidateIf((obj) => !obj.workCycleNumber)
  @IsUUID()
  id?: string;

  @ValidateIf((obj) => !obj.id)
  @IsNumberString()
  workCycleNumber?: number;
}
