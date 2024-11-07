import { LocalDateTime } from '@js-joda/core';
import { AssignmentContext } from './AssignmentContext';

export type Assignments = Record<string, string[]>;

export interface ShiftGroup {
  shiftIds: string[];
  totalEmployeesNeeded: number;
  availableUsers: string[];
  time: { start: LocalDateTime; end: LocalDateTime };
}

export interface UserAssignmentStrategy {
  assignUsers(context: AssignmentContext): Assignments;
}

export interface AssignmentHandler {
  setNext(handler: AssignmentHandler): AssignmentHandler;
  handle(context: AssignmentContext): Promise<void>;
}

export interface ConstrainHandler {
  check(
    userId: string,
    shiftDuration: number,
    shiftDate: LocalDateTime,
    context: AssignmentContext
  ): boolean;
}
