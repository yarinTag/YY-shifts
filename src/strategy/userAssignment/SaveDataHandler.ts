import { AssignmentHandler } from './interface';
import { AssignmentContext } from './AssignmentContext';
import { IShiftRepository } from '../../modules/shifts/shift.interface';

export class SaveDataHandler implements AssignmentHandler {
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
    const shifts = context.shifts!.map((shift) => {
      const findAssinment = context.assignments[shift.id][0];
      if (findAssinment) shift.userId = findAssinment;
      return shift;
    });

    await this.repository.saveAll(shifts);
    context.shifts = shifts;
    await this.nextHandler?.handle(context);
  }
}
