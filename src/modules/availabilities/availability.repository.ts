import { UpdateResult } from 'typeorm';

import { BaseRepository } from '../BaseRepository';
import { CreateRequest } from './dto/CreateRequest';
import { Availability } from './availability.schema';
import { IAvailabilityRepository } from './availability.interface';

export class AvailabilityRepository implements IAvailabilityRepository {
  constructor(private repository: BaseRepository<Availability>) {}

  async getAllAvailabilities(id: string): Promise<Availability[]> {
    return this.repository.find({
      where: { shiftId: id, active: true },
    });
  }

  async save(availability: Availability): Promise<Availability> {
    return this.repository.save(availability);
  }

  async create(req: CreateRequest): Promise<Availability> {
    return this.repository.create(req);
  }

  async findById(id: string): Promise<Availability | null> {
    return this.repository.findById(id);
  }

  async findAll(): Promise<Availability[]> {
    return this.repository.findAll();
  }

  async update(entity: Availability): Promise<UpdateResult> {
    return this.repository.update({ id: entity.id }, entity);
  }
}
