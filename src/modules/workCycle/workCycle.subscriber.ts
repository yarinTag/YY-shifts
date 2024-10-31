import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  SoftRemoveEvent,
  UpdateEvent,
} from 'typeorm';

import { WorkCycle } from './workCycle.schema';
import { WorkCycleJournalRepository } from '../workCycleJournal/workCycleJournal.repository';

@EventSubscriber()
export class WorkCycleSubscriber implements EntitySubscriberInterface<WorkCycle> {
  constructor() {}
  private workCycleJournal = new WorkCycleJournalRepository();

  listenTo() {
    return WorkCycle;
  }

  async afterInsert(event: InsertEvent<WorkCycle>): Promise<void> {
    const journal = this.workCycleJournal.create(event.entity);

    await this.workCycleJournal.save(journal);
  }

  async afterUpdate(event: UpdateEvent<WorkCycle>): Promise<void> {
    if (event.entity) {
      const journal = this.workCycleJournal.create(event.entity as WorkCycle);

      await this.workCycleJournal.save(journal);
    }
  }

  async afterSoftRemove(event: SoftRemoveEvent<WorkCycle>): Promise<void> {
    if (event.entity) {
      const journal = this.workCycleJournal.create(event.entity);

      await this.workCycleJournal.save(journal);
    }
  }
}
