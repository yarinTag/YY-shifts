import { IsUUID, IsNumber } from 'class-validator';

import { Column } from 'typeorm';
import { WorkDay } from '../../../types/enum/workDay';
import { LocalTime } from '@js-joda/core';

export class CreateRequest {
  @Column('time')
  start: LocalTime;

  @Column('time')
  end: LocalTime;

  @IsNumber()
  day: WorkDay;

  @IsNumber()
  amountOfWorkers: number;

  @IsUUID()
  workCycleConfigurationId: string;
}
