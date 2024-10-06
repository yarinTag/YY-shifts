import { IsUUID, IsNumber, IsNotEmpty } from 'class-validator';

import { WorkDay } from '../../../types/enum/workDay';
import { LocalTime } from '@js-joda/core';

export class CreateRequest {
  @IsNotEmpty()
  start: LocalTime;

  @IsNotEmpty()
  end: LocalTime;

  @IsNumber()
  day: WorkDay;

  @IsNumber()
  amountOfWorkers: number;

  @IsUUID()
  workCycleConfigurationId: string;
}
