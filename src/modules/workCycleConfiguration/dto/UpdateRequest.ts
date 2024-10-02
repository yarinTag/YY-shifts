import { IsNotEmpty, IsNumber, IsOptional, IsUUID } from 'class-validator';
import { WorkDay } from '../../../types/enum/workDay';

export class UpdateRequest {
  @IsUUID()
  id: string;
  @IsOptional()
  @IsNumber()
  cycleDays: number;
  @IsOptional()
  @IsNotEmpty()
  startDay: WorkDay;
  @IsOptional()
  @IsNumber()
  legalAmountOfWorkDays: number;
  @IsOptional()
  @IsNumber()
  amountOfDayOff: number;
}
