import { ShiftJournal } from './shiftJournal.schema';
import { IShiftJournalRepository } from './shiftJournal.interface';
import { Repository } from 'typeorm';
import { dataSource } from '../../db';
import { Shift } from '../shifts/shift.schema';

export class ShiftJournalRepository implements IShiftJournalRepository {
  private repository: Repository<ShiftJournal>;

  constructor() {
    this.repository = dataSource.getRepository(ShiftJournal);
  }
  save(shiftJournal: ShiftJournal): Promise<ShiftJournal> {
    return this.repository.save(shiftJournal);
  }

  create(data: Shift): ShiftJournal {
    return this.repository.create({ data });
  }

  async findAllBy(workCycleId: string): Promise<ShiftJournal[]> {
    return await this.repository
      .createQueryBuilder(ShiftJournal.name)
      .where("shiftJournal.data->>'workCycleId' = :workCycleId", {
        workCycleId,
      })
      .getMany();
  }
}
