import { LocalDateTime } from '@js-joda/core';

import { IsOptional, IsUUID, IsBoolean } from 'class-validator';

export class UpdateRequest {
  @IsUUID()
  id: string;

  @IsOptional()
  start: LocalDateTime;

  @IsOptional()
  end: LocalDateTime;

  @IsOptional()
  @IsBoolean()
  active: boolean;
}
