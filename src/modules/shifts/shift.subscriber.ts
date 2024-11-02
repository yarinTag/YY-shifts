import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  SoftRemoveEvent,
  UpdateEvent,
} from 'typeorm';

import { Shift } from './shift.schema';
import { ShiftJournalRepository } from '../shiftJournals/shiftJournal.repository';

@EventSubscriber()
export class ShiftSubscriber implements EntitySubscriberInterface<Shift> {
  constructor() {}
  private shiftJournal = new ShiftJournalRepository();

  listenTo() {
    return Shift;
  }

  async afterInsert(event: InsertEvent<Shift>): Promise<void> {
    const journal = this.shiftJournal.create(event.entity);

    await this.shiftJournal.save(journal);
  }

  async afterUpdate(event: UpdateEvent<Shift>): Promise<void> {
    if (event.entity) {
      const journal = this.shiftJournal.create(event.entity as Shift);

      await this.shiftJournal.save(journal);
    }
  }

  async afterSoftRemove(event: SoftRemoveEvent<Shift>): Promise<void> {
    if (event.entity) {        
      const journal = this.shiftJournal.create(event.entity);

      await this.shiftJournal.save(journal);
    }
  }
}
