import { EntityNotFoundError, UpdateResult } from 'typeorm';
import { CreateRequest } from './dto/CreateRequest';
import { DeleteRequest } from './dto/DeleteRequest';
import { GetByIdRequest } from './dto/GetByIdRequest';
import { UpdateRequest } from './dto/UpdateRequest';
import { WorkCycleConfiguration } from './workCycleConfiguration.schema';
import {
  IWorkCycleConfigurationRepository,
  IWorkCycleConfigurationService,
} from './workCycleConfiguration.interface';
import { plainToInstance } from 'class-transformer';
import { validationEntity } from '../../decorators/validateEntity';
import { UnprocessableEntityError } from '../../middlewares/error/ApiError';

export class WorkCycleConfigurationService
  implements IWorkCycleConfigurationService
{
  constructor(private repository: IWorkCycleConfigurationRepository) {}
  async findAll(): Promise<WorkCycleConfiguration[]> {
    const all = await this.repository.findAll();

    return all;
  }
  async findById(req: GetByIdRequest): Promise<WorkCycleConfiguration | null> {
    const entity = await this.repository.findById(req.id);

    return entity;
  }
  async create(req: CreateRequest): Promise<WorkCycleConfiguration> {
    const entity = await this.repository.create(req);

    const validationResult = await validationEntity(
      WorkCycleConfiguration,
      entity
    );

    if (validationResult.sucsses === false) {
      throw new UnprocessableEntityError(
        `Failed to create new WorkCycleConfiguration : ${validationResult.errors}`
      );
    }
    return await this.repository.save(entity);
  }
  async update(req: UpdateRequest): Promise<UpdateResult> {
    const workCycleConfiguration = await this.repository.findById(req.id);

    if (!workCycleConfiguration) {
      throw new EntityNotFoundError(WorkCycleConfiguration.name, req.id);
    }

    const entity = plainToInstance(WorkCycleConfiguration, {
      ...workCycleConfiguration,
      ...req,
    });
    const validationResult = await validationEntity(
      WorkCycleConfiguration,
      entity
    );

    if (validationResult.sucsses === false) {
      throw new UnprocessableEntityError(
        `User with Id: ${req.id}, Failed to update: ${validationResult.errors}`
      );
    }

    return await this.repository.update(entity);
  }
  async delete(req: DeleteRequest): Promise<WorkCycleConfiguration> {
    const entity = await this.repository.deleteById(req.id);

    if (!entity) {
      throw new EntityNotFoundError(WorkCycleConfiguration.name, req.id);
    }

    return entity;
  }
}
