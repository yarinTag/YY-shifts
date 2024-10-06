import { UpdateResult } from 'typeorm';

import { Shift } from './shift.schema';
import { GetRequest } from './dto/GetRequest';
import { BaseRepository } from '../BaseRepository';
import { CreateRequest } from './dto/CreateRequest';
import { IShiftRepository } from './shift.interface';

export class ShiftRepository implements IShiftRepository {
  constructor(private repository: BaseRepository<Shift>) {}

  save(department: Shift): Promise<Shift> {
    return this.repository.save(department);
  }
  create(req: CreateRequest): Shift {
    return this.repository.create(req);
  }
  findById(id: string): Promise<Shift | null> {
    return this.repository.findById(id);
  }
  findActiveById(id: string, relations?: string[]): Promise<Shift | null> {
    return this.repository.findActiveById(id, relations);
  }
  findAllBy(req: GetRequest): Promise<Shift[]> {
    return this.repository.findBy(req);
  }
  deleteById(id: string): Promise<Shift | null> {
    return this.repository.deleteById(id);
  }
  update(entity: Shift): Promise<UpdateResult> {
    return this.repository.update({ id: entity.id }, entity);
  }
}
