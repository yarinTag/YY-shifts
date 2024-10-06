import { UpdateResult } from 'typeorm';

import { BaseRepository } from '../BaseRepository';
import { CreateRequest } from './dto/CreateRequest';
import { WorkCycle } from './workCycle.schema';
import { IWorkCycleRepository } from './workCycle.interface';

export class WorkCycleRepository implements IWorkCycleRepository {
  constructor(private repository: BaseRepository<WorkCycle>) {}

  async getAllShifts(id: string): Promise<WorkCycle[]> {
    return this.repository.find({
      where: { workCycleConfigurationId: id, active: true },
    });
  }

  async save(workCycle: WorkCycle): Promise<WorkCycle> {
    return this.repository.save(workCycle);
  }
  async create(req: CreateRequest): Promise<WorkCycle> {
    return this.repository.create(req);
  }
  async findById(id: string): Promise<WorkCycle | null> {
    return this.repository.findById(id);
  }
  async findAll(): Promise<WorkCycle[]> {
    return this.repository.findAll();
  }
  async delete(id: string): Promise<WorkCycle | null> {
    return this.repository.deleteById(id);
  }
  async update(entity: WorkCycle): Promise<UpdateResult> {
    return this.repository.update({ id: entity.id }, entity);
  }
}
