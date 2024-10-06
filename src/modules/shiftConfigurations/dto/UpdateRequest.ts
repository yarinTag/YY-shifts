import { IsOptional, IsNumber, IsUUID, IsNotEmpty } from 'class-validator';

import { WorkDay } from '../../../types/enum/workDay';
import { LocalTime } from '@js-joda/core';

export class UpdateRequest {
  @IsUUID()
  id: string;

  @IsOptional()
  @IsNotEmpty()
  start: LocalTime;

  @IsOptional()
  @IsNotEmpty()
  end: LocalTime;

  @IsOptional()
  @IsNumber()
  day: WorkDay;

  @IsOptional()
  @IsNumber()
  amountOfWorkers: number;
}
