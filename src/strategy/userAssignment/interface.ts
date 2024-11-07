import { LocalDateTime } from '@js-joda/core';

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
