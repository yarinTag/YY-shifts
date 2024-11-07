import { ChronoUnit, LocalDateTime } from '@js-joda/core';

import { shuffleArray } from '../../utils/CodeUtils';
import { ShiftGroup, UserAssignmentStrategy } from './interface';

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
      const shiftDuration = time.start.until(time.end,ChronoUnit.HOURS);
      const shiftDate = time.start;

      if (
        this.canAssignUser(
          userId,
          shiftDuration,
          shiftDate,
          this.userDailyHours,
          this.userWeeklyDays
        )
      ) {
        assignedUsers.push(userId);

        const currentDate = shiftDate.toLocalDate().toString();
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

// Helper function to check user assignment constraints
  canAssignUser(
    userId: string,
    shiftDuration: number,
    shiftDate: LocalDateTime,
    userDailyHours: Record<string, Record<string, number>>,
    userWeeklyDays: Record<string, Set<string>>
  ): boolean {
    const currentDate = shiftDate.toString().split('T')[0];
    const weeklyDays = userWeeklyDays[userId] || new Set();
    const dailyHours = userDailyHours[userId] || {};
  
    // Check daily hour limit
    if ((dailyHours[currentDate] || 0) + shiftDuration > 12) return false;
  
    // Check weekly day limit
    if (weeklyDays.size >= 6) return false;
  
    return true;
  }
}