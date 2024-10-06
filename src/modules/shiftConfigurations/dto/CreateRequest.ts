import { IsUUID, IsNumber } from 'class-validator';

import { WorkDay } from '../../../types/enum/workDay';
import { LocalTime } from '@js-joda/core';

export class CreateRequest {
  start: LocalTime;

  end: LocalTime;

  @IsNumber()
  day: WorkDay;

  @IsNumber()
  amountOfWorkers: number;

  @IsUUID()
  workCycleConfigurationId: string;
}
