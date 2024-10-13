import { IsBoolean, IsNotEmpty, IsUUID } from 'class-validator';
import { LocalDateTime } from '@js-joda/core';

export class CreateRequest {
  @IsBoolean()
  active: boolean;

  @IsNotEmpty()
  start: LocalDateTime;

  @IsNotEmpty()
  end: LocalDateTime;

  @IsUUID()
  userId: string;

  @IsUUID()
  shiftConfigurationId: string;

  @IsUUID()
  workCycleId: string;
}
