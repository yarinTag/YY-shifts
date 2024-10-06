import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';
import { LocalDateTime } from '@js-joda/core';

export class UpdateRequest {
  @IsOptional()
  @IsNotEmpty()
  start: LocalDateTime;

  @IsOptional()
  @IsNotEmpty()
  end: LocalDateTime;

  @IsOptional()
  @IsBoolean()
  publish: boolean;
}
