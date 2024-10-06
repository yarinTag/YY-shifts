import { IsOptional, IsNumber, IsUUID } from 'class-validator';

import { WorkDay } from '../../../types/enum/workDay';

export class UpdateRequest {
  @IsUUID()
  id: string;

  @IsOptional()
  start: string;

  @IsOptional()
  end: string;

  @IsOptional()
  @IsNumber()
  day: WorkDay;

  @IsOptional()
  @IsNumber()
  amountOfWorkers: number;
}
