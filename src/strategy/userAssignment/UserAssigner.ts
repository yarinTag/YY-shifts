import { Shift } from '../../modules/shifts/shift.schema';
import { Assignments, ShiftGroup, UserAssignmentStrategy } from './interface';

export class UserAssigner {
  constructor(private strategy: UserAssignmentStrategy) {}

  assignUsersToShifts(shifts: Shift[]): Assignments {
    const shiftGroups: Map<string, ShiftGroup> = new Map();
    const assignments: Assignments = {};

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
      const group = shiftGroups.get(key)!;
      group.shiftIds.push(shift.id);
      group.totalEmployeesNeeded++;
      group.availableUsers = [
        ...new Set([
          ...group.availableUsers,
          ...shift.availabilities.map((a) => a.userId),
        ]),
      ];
    });

    shiftGroups.forEach((shiftGroup, configId) => {
      const assignedUsers = this.strategy.assignUsers(shiftGroup);

      const userQueue = [...assignedUsers];
      for (const shiftId of shiftGroup.shiftIds) {
        assignments[shiftId] = [];
        while (assignments[shiftId].length < 1 && userQueue.length) {
          assignments[shiftId].push(userQueue.shift()!);
        }
      }

      // Warn if there weren’t enough users for this configuration
      if (assignedUsers.length < shiftGroup.totalEmployeesNeeded) {
        console.warn(`Insufficient users for configuration ${configId}`);
      }
    });

    return assignments;
  }
}
