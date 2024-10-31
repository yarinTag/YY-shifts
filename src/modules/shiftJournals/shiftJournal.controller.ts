import { Shift } from '../shifts/shift.schema';
import {
  IShiftJournalController,
  IShiftJournalRepository,
} from './shiftJournal.interface';
import { ShiftJournal } from './shiftJournal.schema';

class ShiftJournalController implements IShiftJournalController {
  constructor(private repository: IShiftJournalRepository) {}

  public createShiftJournal = async (data: Shift): Promise<void> => {
    const journalEntry = this.repository.create(data);
    await this.repository.save(journalEntry);
  };

  public getAllJournalShiftsBy = async (
    id: string
  ): Promise<ShiftJournal[]> => {
    const shifts = await this.repository.findAllBy(id);
    return shifts;
  };
}

export default ShiftJournalController;
