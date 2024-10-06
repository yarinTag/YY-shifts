import { plainToInstance } from 'class-transformer';

import {
  EntityNotFoundError,
  UnprocessableEntityError,
} from '../../middlewares/error/ApiError';
import { CreateRequest } from './dto/CreateRequest';
import { UpdateRequest } from './dto/UpdateRequest';
import { WorkCycle } from './workCycle.schema';
import { validationEntity } from '../../decorators/validateEntity';
import { UpdateResponse } from '../../types/response/response.interface';
import { IWorkCycleRepository, IWorkCycleService } from './workCycle.interface';

class WorkCycleService implements IWorkCycleService {
  constructor(private repository: IWorkCycleRepository) {}

  async create(data: CreateRequest): Promise<WorkCycle> {
    const workCycle = await this.repository.create(data);
    const validationResult = await validationEntity(WorkCycle, workCycle);

    if (validationResult.sucsses === false) {
      throw new UnprocessableEntityError(
        `Failed to create new Department : ${validationResult.errors}`
      );
    }

    const result = await this.repository.save(workCycle);

    return result;
  }

  async getAll(workCycleConfigurationId: string): Promise<WorkCycle[]> {
    return await this.repository.getAllShifts(workCycleConfigurationId);
  }

  async getById(id: string): Promise<WorkCycle | null> {
    const workCycle = await this.repository.findById(id);

    if (!workCycle) {
      throw new EntityNotFoundError(WorkCycle.name, id);
    }

    return workCycle;
  }

  async updateById(data: UpdateRequest): Promise<UpdateResponse> {
    const workCycle = await this.repository.findById(data.id);

    if (!workCycle) {
      throw new EntityNotFoundError(WorkCycle.name, data.id);
    }

    const entity = plainToInstance(WorkCycle, {
      ...workCycle,
      ...data,
    });
    const validationResult = await validationEntity(WorkCycle, entity);

    if (validationResult.sucsses === false) {
      throw new UnprocessableEntityError(
        `${WorkCycle.name} with Id: ${data.id}, Failed to update: ${validationResult.errors}`
      );
    }

    await this.repository.update(entity);
    return {
      success: true,
      message: 'Shift configuration updated successfully',
    };
  }

  async delete(id: string): Promise<UpdateResponse> {
    const workCycle = await this.repository.delete(id);

    if (!workCycle) {
      throw new EntityNotFoundError(WorkCycle.name, id);
    }

    return {
      success: true,
      message: 'Shift configuration deleted successfully',
    };
  }
}

export default WorkCycleService;
