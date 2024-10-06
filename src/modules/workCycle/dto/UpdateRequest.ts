import { IsBoolean, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { LocalDate } from '@js-joda/core';

export class UpdateRequest {
  @IsUUID()
  id: string;
  // ISO 8601
  // "2024-10-06"
  @IsOptional()
  @IsNotEmpty()
  start: LocalDate;
  // ISO 8601
  // "2024-10-06"
  @IsOptional()
  @IsNotEmpty()
  end: LocalDate;

  @IsOptional()
  @IsBoolean()
  publish: boolean;
}
