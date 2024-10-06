import { IsOptional, IsNumber, IsUUID } from 'class-validator';
import { Column } from 'typeorm';
import { WorkDay } from '../../../types/enum/workDay';
import { LocalTime } from '@js-joda/core';

export class UpdateRequest {
  @IsUUID()
  id: string;

  @IsOptional()
  @Column('time')
  start: LocalTime;

  @IsOptional()
  @Column('time')
  end: LocalTime;

  @IsOptional()
  @IsNumber()
  day: WorkDay;

  @IsOptional()
  @IsNumber()
  amountOfWorkers: number;
}
