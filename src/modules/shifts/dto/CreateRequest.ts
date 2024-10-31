import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { LocalDateTime } from '@js-joda/core';
import { ShiftType } from '../../../types/enum/ShiftType';

export class CreateRequest {
  @IsNotEmpty()
  start: LocalDateTime;

  @IsNotEmpty()
  end: LocalDateTime;

  @IsUUID()
  @IsOptional()
  userId?: string;

  @IsUUID()
  shiftConfigurationId: string;

  @IsUUID()
  workCycleId: string;

  @IsOptional()
  @IsNotEmpty()
  shiftType?: ShiftType;
}
