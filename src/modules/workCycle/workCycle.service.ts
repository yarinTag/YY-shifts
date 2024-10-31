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
import { FindBy } from './dto/FindBy';
import { ShiftComponent } from '../shifts/component/shift.component';

class WorkCycleService implements IWorkCycleService {
  constructor(
    private readonly repository: IWorkCycleRepository,
    private readonly shiftComponent: ShiftComponent
  ) {}

  async create(data: CreateRequest): Promise<WorkCycle> {
    const workCycle = await this.repository.create(data);
    await validationEntity(WorkCycle, workCycle);
    const entity = await this.repository.save(workCycle);
    // await this.shiftComponent.createShifts(workCycle);
    return entity;
  }

  async findAll(): Promise<WorkCycle[]> {
    return await this.repository.findAll();
  }

  async findBy(req: FindBy): Promise<WorkCycle | null> {
    const workCycle = await this.repository.findBy(req);

    return workCycle;
  }

  async updateById(data: UpdateRequest): Promise<UpdateResponse> {
    const workCycle = await this.repository.findBy({ id: data.id });

    if (!workCycle) {
      throw new EntityNotFoundError(WorkCycle.name, data.id);
    }

    const entity = plainToInstance(WorkCycle, {
      ...workCycle,
      ...data,
    });
    const validationResult = await validationEntity(WorkCycle, entity);

    if (validationResult.success === false) {
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
