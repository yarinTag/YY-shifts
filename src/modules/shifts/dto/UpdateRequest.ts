import { LocalDateTime } from '@js-joda/core';

import { IsOptional, IsUUID } from 'class-validator';
import { ShiftType } from '../../../types/enum/ShiftType';

export class UpdateRequest {
  @IsUUID()
  id: string;

  @IsOptional()
  start: LocalDateTime;

  @IsOptional()
  end: LocalDateTime;

  @IsOptional()
  shiftType: ShiftType;
}
