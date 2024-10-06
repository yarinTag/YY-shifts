import { IsBoolean, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { LocalDateTime } from '@js-joda/core';

export class UpdateRequest {
  @IsUUID()
  id: string;

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
