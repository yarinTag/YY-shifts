import { IsOptional, IsNumber, IsUUID } from 'class-validator';
import { Column } from 'typeorm';
import { WorkDay } from '../../../types/enum/workDay';

export class UpdateRequest {
  @IsUUID()
  id: string;

  @IsOptional()
  @Column('time')
  start: string;

  @IsOptional()
  @Column('time')
  end: string;

  @IsOptional()
  @IsNumber()
  day: WorkDay;

  @IsOptional()
  @IsNumber()
  amountOfWorkers: number;
}
