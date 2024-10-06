import { IsUUID, IsNumber } from 'class-validator';

import { WorkDay } from '../../../types/enum/workDay';

export class CreateRequest {
  start: string;

  end: string;

  @IsNumber()
  day: WorkDay;

  @IsNumber()
  amountOfWorkers: number;

  @IsUUID()
  workCycleConfigurationId: string;
}
