import { shuffleArray } from '../../utils/CodeUtils';
import { AssignmentContext } from './AssignmentContext';
import { AssignmentHandler } from './interface';

export class ShuffleHandler implements AssignmentHandler {
  private nextHandler: AssignmentHandler | null = null;

  setNext(handler: AssignmentHandler): AssignmentHandler {
    this.nextHandler = handler;
    return handler;
  }

  async handle(context: AssignmentContext): Promise<void> {
    context.shiftGroups.forEach((shiftGroup) => {
      shiftGroup.availableUsers = shuffleArray([
        ...new Set(shiftGroup.availableUsers),
      ]);
    });
   await this.nextHandler?.handle(context);
  }
}
