import { LocalDateTime } from '@js-joda/core';
import { Shift } from '../modules/shifts/shift.schema';

export type Assignments = Record<string, string[]>;

export interface ShiftGroup {
  shiftIds: string[];
  totalEmployeesNeeded: number;
  availableUsers: string[];
  time: { start: LocalDateTime; end: LocalDateTime };
}

export interface UserAssignmentStrategy {
  assignUsers(shiftGroup: ShiftGroup): string[];
}
