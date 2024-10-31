import { IsNumberString, IsUUID, ValidateIf } from 'class-validator';

export default class FindBy {
  @ValidateIf((obj) => !obj.shiftId)
  @IsUUID()
  userId?: string;

  @ValidateIf((obj) => !obj.userId)
  @IsNumberString()
  shiftId?: string;
}
