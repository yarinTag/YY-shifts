import { BaseRepository } from '../BaseRepository';
import { UpdateResult } from 'typeorm';
import { IShiftConfigurationRepository } from './shiftConfiguration.interface';
import { ShiftConfiguration } from './shiftConfiguration.schema';
import { CreateRequest } from './dto/CreateRequest';

export class ShiftConfigurationRepository
  implements IShiftConfigurationRepository
{
  constructor(private repository: BaseRepository<ShiftConfiguration>) {}

  async getAllShifts(id: string): Promise<ShiftConfiguration[]> {
    return this.repository.find({ where: { workCycleConfigurationId: id } });
  }

  async save(shifConfiguration: ShiftConfiguration): Promise<ShiftConfiguration> {
    return this.repository.save(shifConfiguration);
  }
  async create(req: CreateRequest): Promise<ShiftConfiguration> {
    return this.repository.create(req);
  }
  async findById(id: string): Promise<ShiftConfiguration | null> {
    return this.repository.findById(id);
  }
  async findAll(): Promise<ShiftConfiguration[]> {
    return this.repository.findAll();
  }
  async delete(id: string): Promise<ShiftConfiguration | null> {
    return this.repository.deleteById(id);
  }
  async update(entity: ShiftConfiguration): Promise<UpdateResult> {
    return this.repository.update({ id: entity.id }, entity);
  }
}
