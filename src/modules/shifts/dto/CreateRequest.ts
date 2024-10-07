import { IsBoolean, IsNotEmptyObject, IsUUID } from 'class-validator';
import { LocalDateTime } from '@js-joda/core';

export class CreateRequest {
  @IsBoolean()
  active: boolean;

  @IsNotEmptyObject()
  start: LocalDateTime;

  @IsNotEmptyObject()
  end: LocalDateTime;

  @IsUUID()
  userId: string;

  @IsUUID()
  shiftConfigurationId: string;

  @IsUUID()
  workCycleId: string;
}
