import { IsOptional, IsNumber, IsUUID } from 'class-validator';

import { WorkDay } from '../../../types/enum/workDay';
import { LocalTime } from '@js-joda/core';

export class UpdateRequest {
  @IsUUID()
  id: string;

  @IsOptional()
  start: LocalTime;

  @IsOptional()
  end: LocalTime;

  @IsOptional()
  @IsNumber()
  day: WorkDay;

  @IsOptional()
  @IsNumber()
  amountOfWorkers: number;
}
