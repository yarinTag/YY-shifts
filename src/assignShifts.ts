/*
the first table is: work_cycle we get all the work_cycles by the field publish: false.
the second table is: shift we get all the shift by the field work_cycle_id.
the third table is: availability we get all the availabilities by the field shift_id
*/

import { LocalDateTime, ZoneId } from '@js-joda/core';
import { Shift } from './modules/shifts/shift.schema';
import { ShiftGroup } from './noname/interface';

//Get all shifts by created_at the last day when created.
//Get all users by shiftId? or by calculate some date for fetch all the availabilties are related to the shifts.
// Put shift's into map as the key is start + end the value is the shift id.
//Iterate availabilities by shift id.
//Shffule the users in each shift before start to assign.

type Assignments = Record<string, string[]>;

export function assignUsersToShifts(shifts: Shift[]): Assignments {
  const shiftGroups: Map<string, ShiftGroup> = new Map();
  const userStats: Record<string, { totalHours: number; totalShifts: number }> =
    {};

  shifts.forEach((shift) => {
    const key = shift.shiftConfigurationId;
    if (!shiftGroups.has(key)) {
      shiftGroups.set(key, {
        shiftIds: [],
        totalEmployeesNeeded: 0,
        availableUsers: [],
        time: { start: shift.start, end: shift.end },
      });
    }
    shiftGroups.get(key)!.shiftIds.push(shift.id);
    shiftGroups.get(key)!.totalEmployeesNeeded++;
    shiftGroups.get(key)!.availableUsers = [
      ...new Set([
        ...shiftGroups.get(key)!.availableUsers,
        ...shift.availabilities.map((a) => a.userId),
      ]),
    ];
  });

  const assignments: Assignments = {};
  const userDailyHours: Record<string, Record<string, number>> = {};
  const userWeeklyDays: Record<string, Set<string>> = {};

  shiftGroups.forEach(
    ({ shiftIds, totalEmployeesNeeded, availableUsers,time }, configId) => {
      const shuffledUsers = shuffleArray(availableUsers);
      const assignedUsers: string[] = [];

      // Try to assign users to this configuration until the required count is met
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
            userDailyHours,
            userWeeklyDays
          )
        ) {
          assignedUsers.push(userId);

          // Track the assigned hours and days for the user
          const currentDate = shiftDate.toString().split('T')[0];
          if (!userDailyHours[userId]) userDailyHours[userId] = {};
          if (!userDailyHours[userId][currentDate])
            userDailyHours[userId][currentDate] = 0;
          userDailyHours[userId][currentDate] += shiftDuration;

          if (!userWeeklyDays[userId]) userWeeklyDays[userId] = new Set();
          userWeeklyDays[userId].add(currentDate);

          if (!userStats[userId])
            userStats[userId] = { totalHours: 0, totalShifts: 0 };
          userStats[userId].totalHours += shiftDuration;
          userStats[userId].totalShifts += 1;

          if (assignedUsers.length >= totalEmployeesNeeded) break;
        }
      }

      const userQueue = [...assignedUsers];
      for (const shiftId of shiftIds) {
        assignments[shiftId] = [];
        while (assignments[shiftId].length < 1 && userQueue.length) {
          assignments[shiftId].push(userQueue.shift()!);
        }
      }

      // Warn if there weren’t enough users for this configuration
      if (assignedUsers.length < totalEmployeesNeeded) {
        console.warn(`Insufficient users for configuration ${configId}`);
      }
    }
  );

  console.log('User Stats:', userStats);
  return assignments;
}

// Helper function to check user assignment constraints
export function canAssignUser(
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

// Utility function to shuffle an array
export function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
