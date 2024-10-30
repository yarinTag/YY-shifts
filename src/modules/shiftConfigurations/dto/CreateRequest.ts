import { LocalTime } from '@js-joda/core';
import { IsUUID, IsNumber, IsNotEmpty, Min, Max } from 'class-validator';

import { WorkDay } from '../../../types/enum/workDay';

export class CreateRequest {
  @IsNotEmpty()
  start: LocalTime;

  @IsNotEmpty()
  end: LocalTime;

  @IsNumber()
  @Min(1)
  @Max(7)
  day: WorkDay;

  @IsNumber()
  amountOfWorkers: number;

  @IsUUID()
  workCycleConfigurationId: string;
}
