import { LocalDateTime } from '@js-joda/core';
import { AssignmentContext } from '../AssignmentContext';
import { ConstrainHandler } from '../interface';

export class DailyConstraintHandler implements ConstrainHandler  {
  public check(
    userId: string,
    shiftDuration: number,
    shiftDate: LocalDateTime,
    context: AssignmentContext
  ): boolean {
    const currentDate = shiftDate.toLocalDate().toString();
    const dailyHours = context.userDailyHours[userId] || {};

    return (dailyHours[currentDate] || 0) + shiftDuration <= 12;
  }
}
