import { UpdateResult } from 'typeorm';
import { CreateRequest } from './dto/CreateRequest';
import { IWorkCycleConfigurationRepository } from './workCycleConfiguration.interface';
import { WorkCycleConfiguration } from './workCycleConfiguration.schema';
import { BaseRepository } from '../BaseRepository';

export class WorkCycleConfigurationRepository
  implements IWorkCycleConfigurationRepository
{
  constructor(private baseRepository: BaseRepository<WorkCycleConfiguration>) {}

  save(entity: WorkCycleConfiguration): Promise<WorkCycleConfiguration> {
    return this.baseRepository.save(entity);
  }
  create(req: CreateRequest): WorkCycleConfiguration {
    return this.baseRepository.create(req);
  }
  findById(id: string): Promise<WorkCycleConfiguration | null> {
    return this.baseRepository.findById(id);
  }
  findActiveById(
    id: string,
    relations?: string[]
  ): Promise<WorkCycleConfiguration | null> {
    return this.baseRepository.findActiveById(id, relations);
  }
  findAll(): Promise<WorkCycleConfiguration[]> {
    return this.baseRepository.findAll();
  }
  deleteById(id: string): Promise<WorkCycleConfiguration | null> {
    return this.baseRepository.deleteById(id);
  }
  update(entity: WorkCycleConfiguration): Promise<UpdateResult> {
    return this.baseRepository.update({ id: entity.id }, entity);
  }
}
