import { plainToInstance } from 'class-transformer';

import {
  IShiftConfigurationRepository,
  IShiftConfigurationService,
} from './shiftConfiguration.interface';
import {
  EntityNotFoundError,
  UnprocessableEntityError,
} from '../../middlewares/error/ApiError';
import { CreateRequest } from './dto/CreateRequest';
import { UpdateRequest } from './dto/UpdateRequest';
import { ShiftConfiguration } from './shiftConfiguration.schema';
import { validationEntity } from '../../decorators/validateEntity';
import { UpdateResponse } from '../../types/response/response.interface';

class ShiftConfigurationService implements IShiftConfigurationService {
  constructor(private repository: IShiftConfigurationRepository) {}

  async create(data: CreateRequest): Promise<ShiftConfiguration> {
    const shiftConfiguration = await this.repository.create(data);
    const validationResult = await validationEntity(
      ShiftConfiguration,
      shiftConfiguration
    );

    if (validationResult.sucsses === false) {
      throw new UnprocessableEntityError(
        `Failed to create new Department : ${validationResult.errors}`
      );
    }

    const result = await this.repository.save(shiftConfiguration);

    return result;
  }

  async getAll(
    workCycleConfigurationId: string
  ): Promise<ShiftConfiguration[]> {
    return await this.repository.findAllByWorkCycleConfigurationId(
      workCycleConfigurationId
    );
  }

  async getById(id: string): Promise<ShiftConfiguration | null> {
    const shiftConfiguration = await this.repository.findById(id);

    if (!shiftConfiguration) {
      throw new EntityNotFoundError(ShiftConfiguration.name, id);
    }

    return shiftConfiguration;
  }

  async updateById(data: UpdateRequest): Promise<UpdateResponse> {
    const shiftConfiguration = await this.repository.findById(data.id);

    if (!shiftConfiguration) {
      throw new EntityNotFoundError(ShiftConfiguration.name, data.id);
    }

    const entity = plainToInstance(ShiftConfiguration, {
      ...shiftConfiguration,
      ...data,
    });
    const validationResult = await validationEntity(ShiftConfiguration, entity);

    if (validationResult.sucsses === false) {
      throw new UnprocessableEntityError(
        `${ShiftConfiguration.name} with Id: ${data.id}, Failed to update: ${validationResult.errors}`
      );
    }

    await this.repository.update(entity);
    return {
      success: true,
      message: 'Shift configuration updated successfully',
    };
  }

  async delete(id: string): Promise<UpdateResponse> {
    const shiftConfiguration = await this.repository.delete(id);

    if (!shiftConfiguration) {
      throw new EntityNotFoundError(ShiftConfiguration.name, id);
    }

    return {
      success: true,
      message: 'Shift configuration deleted successfully',
    };
  }
}

export default ShiftConfigurationService;
