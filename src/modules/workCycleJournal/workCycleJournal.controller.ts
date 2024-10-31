import { WorkCycle } from "../workCycle/workCycle.schema";
import { IWorkCycleJournalController, IWorkCycleJournalRepository } from "./workCycleJournal.interface";
import { WorkCycleJournal } from "./workCycleJournal.schema";


class WorkCycleJournalController implements IWorkCycleJournalController {
  constructor(private repository: IWorkCycleJournalRepository) {}

  public createShiftJournal = async (data: WorkCycle): Promise<void> => {
    const journalEntry = this.repository.create(data);

    await this.repository.save(journalEntry);
  };

  public getAllJournalShiftsBy = async (
    id: string
  ): Promise<WorkCycleJournal[]> => {
    const shifts = await this.repository.findAllByWorkCycleId(id);
    return shifts;
  };
}

export default WorkCycleJournalController;
