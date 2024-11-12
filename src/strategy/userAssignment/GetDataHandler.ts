import { AssignmentContext } from './AssignmentContext';
import { Shift } from '../../modules/shifts/shift.schema';
import { AssignmentHandler, ShiftGroup } from './interface';
import { IShiftRepository } from '../../modules/shifts/shift.interface';
import { EntityNotFoundError } from '../../middlewares/error/ApiError';

export class GetDataHandler implements AssignmentHandler {
  private repository: IShiftRepository;
  private nextHandler: AssignmentHandler | null = null;

  constructor(repository: IShiftRepository) {
    this.repository = repository;
  }

  setNext(handler: AssignmentHandler): AssignmentHandler {
    this.nextHandler = handler;
    return handler;
  }

  async handle(context: AssignmentContext): Promise<void> {
    const shifts = await this.repository.findAllBy(
      { workCycleId: context.workCycleId },
      ['availabilities']
    );

    if (!shifts) throw new EntityNotFoundError(Shift.name, context.workCycleId);

    context.shifts = shifts;
    context.shiftGroups = this.groupShiftsByConfigurationId(shifts);
    await this.nextHandler?.handle(context);
  }

  groupShiftsByConfigurationId(shifts: Shift[]): Map<string, ShiftGroup> {
    const shiftGroups: Map<string, ShiftGroup> = new Map();
    shifts.forEach((shift) => {
      const key = shift.shiftConfigurationId;
      if (!shiftGroups.has(key)) {
        shiftGroups.set(key, {
          shiftIds: [],
          totalEmployeesNeeded: 0,
          availableUsers: [],
          time: {
            start: shift.start,
            end: shift.end,
          },
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
    return shiftGroups;
  }
}
