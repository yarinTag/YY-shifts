import { IsBoolean, IsNotEmpty, IsUUID } from 'class-validator';
import { LocalDateTime } from '@js-joda/core';

export class CreateRequest {
  @IsNotEmpty()
  start: LocalDateTime;

  @IsNotEmpty()
  end: LocalDateTime;

  @IsBoolean()
  publish: boolean;

  @IsUUID()
  workCycleConfigurationId: string;
}
