import { LocalDateTime } from '@js-joda/core';
import { AssignmentContext } from '../AssignmentContext';
import { ConstrainHandler } from '../interface';

export class WeeklyConstraintHandler implements ConstrainHandler {
  public check(
    userId: string,
    shiftDuration: number,
    shiftDate: LocalDateTime,
    context: AssignmentContext
  ): boolean {
    const weeklyDays = context.userWeeklyDays[userId] || new Set();

    return weeklyDays.size < 6;
  }
}
