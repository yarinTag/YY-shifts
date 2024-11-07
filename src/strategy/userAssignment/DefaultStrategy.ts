import { ChronoUnit, LocalDateTime } from '@js-joda/core';
import { AssignmentContext } from './AssignmentContext';
import { Assignments, ShiftGroup, UserAssignmentStrategy } from './interface';
import { DailyConstraintHandler } from './constraint/DailyConstraintHandler';
import { WeeklyConstraintHandler } from './constraint/WeeklyConstraintHandler';

export class DefaultStrategy implements UserAssignmentStrategy {
  private readonly dailyConstraintHandler = new DailyConstraintHandler();
  private readonly weeklyConstraintHandler = new WeeklyConstraintHandler();

  assignUsers(context: AssignmentContext): Assignments {
    const assignments: Assignments = {};
    context.shiftGroups.forEach((shiftGroup, configId) => {
      const { availableUsers, totalEmployeesNeeded, time } = shiftGroup;
      const assignedUsers: string[] = [];

      for (const userId of availableUsers) {
        const shiftDuration = time.start.until(time.end, ChronoUnit.HOURS);
        const shiftDate = time.start;

        if (
          this.dailyConstraintHandler.check(
            userId,
            shiftDuration,
            shiftDate,
            context
          ) &&
          this.weeklyConstraintHandler.check(
            userId,
            shiftDuration,
            shiftDate,
            context
          )
        ) {
          assignedUsers.push(userId);

          this.updateContextData(userId, shiftDuration, shiftDate, context);

          if (assignedUsers.length >= totalEmployeesNeeded) break;
        }
      }

      shiftGroup.availableUsers = assignedUsers;
    });

    context.shiftGroups.forEach(({ shiftIds, availableUsers }, configId) => {
      const userQueue = [...availableUsers];
      shiftIds.forEach((shiftId) => {
        assignments[shiftId] = [];
        while (assignments[shiftId].length < 1 && userQueue.length) {
          assignments[shiftId].push(userQueue.shift()!);
        }
      });

      if (availableUsers.length < shiftIds.length) {
        console.warn(`Insufficient users for configuration ${configId}`);
      }
    });

    return assignments;
  }

  protected updateContextData(
    userId: string,
    shiftDuration: number,
    shiftDate: LocalDateTime,
    context: AssignmentContext
  ): void {
    const currentDate = shiftDate.toLocalDate().toString();

    if (!context.userDailyHours[userId]) context.userDailyHours[userId] = {};
    context.userDailyHours[userId][currentDate] =
      (context.userDailyHours[userId][currentDate] || 0) + shiftDuration;

    if (!context.userWeeklyDays[userId])
      context.userWeeklyDays[userId] = new Set();
    context.userWeeklyDays[userId].add(currentDate);
  }
}
