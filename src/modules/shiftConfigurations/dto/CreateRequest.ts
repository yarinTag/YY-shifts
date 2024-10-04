import { IsUUID, IsNumber } from 'class-validator';

import { Column } from 'typeorm';
import { WorkDay } from '../../../types/enum/workDay';

export class CreateRequest {
  @Column('time')
  start: string;

  @Column('time')
  end: string;

  @IsNumber()
  day: WorkDay;

  @IsNumber()
  amountOfWorkers: number;

  @IsUUID()
  workCycleConfigurationId: string;
}
