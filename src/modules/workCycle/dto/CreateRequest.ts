import { IsBoolean, IsNotEmpty, IsUUID } from 'class-validator';
import { LocalDate } from '@js-joda/core';

export class CreateRequest {
  // ISO 8601
  // "2024-10-06"
  @IsNotEmpty()
  start: LocalDate;
  // ISO 8601
  // "2024-10-10"
  @IsNotEmpty()
  end: LocalDate;

  @IsBoolean()
  publish: boolean;

  @IsUUID()
  workCycleConfigurationId: string;
}
