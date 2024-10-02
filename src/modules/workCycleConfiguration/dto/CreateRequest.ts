import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';
import { WorkDay } from '../../../types/enum/workDay';

export class CreateRequest {
  @IsNumber()
  cycleDays: number;
  @IsNotEmpty()
  startDay: WorkDay;
  @IsNumber()
  legalAmountOfWorkDays: number;
  @IsNumber()
  amountOfDayOff: number;
  @IsUUID()
  departmentId: string;
}
