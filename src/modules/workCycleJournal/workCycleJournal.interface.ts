import { WorkCycle } from '../workCycle/workCycle.schema';
import { WorkCycleJournal } from './workCycleJournal.schema';

export interface IWorkCycleJournalController {
  createShiftJournal(data: WorkCycle): Promise<void>;
  getAllJournalShiftsBy(id: string): Promise<WorkCycleJournal[]>;
}

export interface IWorkCycleJournalRepository {
  create(data: WorkCycle): WorkCycleJournal;
  findAllByWorkCycleId(id: string): Promise<WorkCycleJournal[]>;
  save(workCycleJournal: WorkCycleJournal): Promise<WorkCycleJournal>;
}
