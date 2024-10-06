import { IsBoolean, IsOptional, IsString, IsUUID } from 'class-validator';
import { LocalDateTime } from '@js-joda/core';

export class CreateRequest {
  @IsBoolean()
  active: boolean;

  start: LocalDateTime;

  end: LocalDateTime;

  @IsUUID()
  userId: string;

  @IsUUID()
  shiftConfigurationId: string;

  @IsUUID()
  workCycleId: string;
}
