import { AssignmentContext } from './AssignmentContext';
import { AssignmentHandler } from './interface';

export class RunAssignmentHandler implements AssignmentHandler {
  private nextHandler: AssignmentHandler | null = null;

  setNext(handler: AssignmentHandler): AssignmentHandler {
    this.nextHandler = handler;
    return handler;
  }

  async handle(context: AssignmentContext): Promise<void> {
    context.assignments = context.assignmentStrategy.assignUsers(
      context
    );
    await this.nextHandler?.handle(context);
  }
}
