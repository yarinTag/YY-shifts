import { Shift } from '../shifts/shift.schema';
import { ShiftJournal } from './shiftJournal.schema';

export interface IShiftJournalController {
  createShiftJournal(data: Shift): Promise<void>;
  getAllJournalShiftsBy(id: string): Promise<ShiftJournal[]>;
}

export interface IShiftJournalRepository {
  create(data: Shift): ShiftJournal;
  findAllBy(id: string): Promise<ShiftJournal[]>;
  save(shiftJournal: ShiftJournal): Promise<ShiftJournal>;
}
