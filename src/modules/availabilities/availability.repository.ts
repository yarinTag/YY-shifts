import { UpdateResult } from 'typeorm';

import { BaseRepository } from '../BaseRepository';
import { CreateRequest } from './dto/CreateRequest';
import { Availability } from './availability.schema';
import { IAvailabilityRepository } from './availability.interface';
import { FindBy } from './dto/FIndBy';

export class AvailabilityRepository implements IAvailabilityRepository {
  constructor(private repository: BaseRepository<Availability>) {}

  async getAllAvailabilitiesByUserId(userId: string): Promise<Availability[]> {
    return this.repository.find({
      where: { userId },
    });
  }

  async save(availability: Availability): Promise<Availability> {
    return this.repository.save(availability);
  }

  async create(req: CreateRequest): Promise<Availability> {
    return this.repository.create(req);
  }

  async findBy(findBy: FindBy): Promise<Availability | null> {
    return this.repository.findOneBy({ ...findBy });
  }

  async findAll(): Promise<Availability[]> {
    return this.repository.findAll();
  }

  async update(entity: Availability): Promise<UpdateResult> {
    return this.repository.update(
      { userId: entity.userId, shiftId: entity.shiftId },
      entity
    );
  }
}
