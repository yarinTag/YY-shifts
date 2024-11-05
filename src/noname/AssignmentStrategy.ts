import { ZoneId } from '@js-joda/core';
import { ShiftGroup, UserAssignmentStrategy } from './interface';
import { canAssignUser, shuffleArray } from '../assignShifts';

export class DefaultUserAssignmentStrategy implements UserAssignmentStrategy {
  constructor(
    private userDailyHours: Record<string, Record<string, number>>,
    private userWeeklyDays: Record<string, Set<string>>
  ) {}

  assignUsers(shiftGroup: ShiftGroup): string[] {
    const { totalEmployeesNeeded, availableUsers, time } = shiftGroup;
    const uniqueAvailableUsers = [...new Set(availableUsers)];
    const shuffledUsers = shuffleArray(uniqueAvailableUsers);
    const assignedUsers: string[] = [];

    for (const userId of shuffledUsers) {
      const shiftDuration =
        (time.end.atZone(ZoneId.UTC).toInstant().toEpochMilli() -
          time.start.atZone(ZoneId.UTC).toInstant().toEpochMilli()) /
        (1000 * 60 * 60); // Duration in hours
      const shiftDate = time.start;

      if (
        canAssignUser(
          userId,
          shiftDuration,
          shiftDate,
          this.userDailyHours,
          this.userWeeklyDays
        )
      ) {
        assignedUsers.push(userId);

        const currentDate = shiftDate.toString().split('T')[0];
        if (!this.userDailyHours[userId]) this.userDailyHours[userId] = {};
        if (!this.userDailyHours[userId][currentDate])
          this.userDailyHours[userId][currentDate] = 0;
        this.userDailyHours[userId][currentDate] += shiftDuration;

        if (!this.userWeeklyDays[userId])
          this.userWeeklyDays[userId] = new Set();
        this.userWeeklyDays[userId].add(currentDate);

        if (assignedUsers.length >= totalEmployeesNeeded) break;
      }
    }

    return assignedUsers;
  }
}
