import { CreateRequest } from './dto/CreateRequest';
import { UpdateRequest } from './dto/UpdateRequest';
import {
  IShiftConfigurationRepository,
  IShiftConfigurationService,
} from './shiftConfiguration.interface';
import { ShiftConfiguration } from './shiftConfiguration.schema';
import { validationEntity } from '../../decorators/validateEntity';
import {
  EntityNotFoundError,
  UnprocessableEntityError,
} from '../../middlewares/error/ApiError';
import { plainToInstance } from 'class-transformer';

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
    return this.repository.getAllShifts(workCycleConfigurationId);
  }

  async getById(id: string): Promise<ShiftConfiguration | null> {
    const shiftConfiguration = await this.repository.findById(id);

    if (!shiftConfiguration) {
      throw new EntityNotFoundError(ShiftConfiguration.name, id);
    }

    return shiftConfiguration;
  }

  async updateById(
    data: UpdateRequest
  ): Promise<{ sucsses: boolean; message: string }> {
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
        `Departments with Id: ${data.id}, Failed to update: ${validationResult.errors}`
      );
    }

    await this.repository.update(entity);
    return {
      sucsses: true,
      message: 'Shift configuration updated successfully',
    };
  }

  async delete(id: string): Promise<{ sucsses: boolean; message: string }> {
    const shiftConfiguration = await this.repository.delete(id);

    if (!shiftConfiguration) {
      throw new EntityNotFoundError(ShiftConfiguration.name, id);
    }

    return {
      sucsses: true,
      message: 'Shift configuration deleted successfully',
    };
  }
}

export default ShiftConfigurationService;
