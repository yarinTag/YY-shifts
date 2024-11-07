import { AssignmentContext } from './AssignmentContext';
import { DefaultStrategy } from './DefaultStrategy';
import { AssignmentHandler } from './interface';

export class GetAssignmentStrategy implements AssignmentHandler {
  private nextHandler: AssignmentHandler | null = null;

  setNext(handler: AssignmentHandler): AssignmentHandler {
    this.nextHandler = handler;
    return handler;
  }

  async handle(context: AssignmentContext): Promise<void> {
    context.assignmentStrategy = new DefaultStrategy();
    await this.nextHandler?.handle(context);
  }
}
