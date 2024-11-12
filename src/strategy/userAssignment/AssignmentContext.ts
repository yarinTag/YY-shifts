import { Shift } from '../../modules/shifts/shift.schema';
import { Assignments, ShiftGroup, UserAssignmentStrategy } from './interface';

export class AssignmentContext {
  public shifts?: Shift[];
  public workCycleId: string;
  public assignments: Assignments = {};
  public shiftGroups: Map<string, ShiftGroup>;
  public userDailyHours: Record<string, Record<string, number>> = {};
  public userWeeklyDays: Record<string, Set<string>> = {};
  public assignmentStrategy: UserAssignmentStrategy;
  
  constructor(workCycleId: string) {
    this.workCycleId = workCycleId;
  }
}
