import { IsNotEmpty, IsUUID } from 'class-validator';
import { LocalDateTime } from '@js-joda/core';

export class CreateRequest {
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
