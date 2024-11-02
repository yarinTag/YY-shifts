import { Repository } from 'typeorm';
import { dataSource } from '../../db';
import { WorkCycle } from '../workCycle/workCycle.schema';
import { WorkCycleJournal } from './workCycleJournal.schema';
import { IWorkCycleJournalRepository } from './workCycleJournal.interface';

export class WorkCycleJournalRepository implements IWorkCycleJournalRepository {
  private repository: Repository<WorkCycleJournal>;

  constructor() {
    this.repository = dataSource.getRepository(WorkCycleJournal);
  }
  save(shiftJournal: WorkCycleJournal): Promise<WorkCycleJournal> {
    return this.repository.save(shiftJournal);
  }

  create(data: WorkCycle): WorkCycleJournal {
    return this.repository.create({ data });
  }

  async findAllByWorkCycleId(id: string): Promise<WorkCycleJournal[]> {
    return await this.repository
      .createQueryBuilder(WorkCycleJournal.name)
      .where("workCycleJournal.data->>'id' = :id", {
        id,
      })
      .getMany();
  }
}
