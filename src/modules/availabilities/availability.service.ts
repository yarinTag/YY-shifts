import { plainToInstance } from 'class-transformer';

import {
  IAvailabilityRepository,
  IAvailabilityService,
} from './availability.interface';
import {
  EntityNotFoundError,
  UnprocessableEntityError,
} from '../../middlewares/error/ApiError';
import { CreateRequest } from './dto/CreateRequest';
import { UpdateRequest } from './dto/UpdateRequest';
import { DeleteRequest } from './dto/DeleteRequest';
import { Availability } from './availability.schema';
import { validationEntity } from '../../decorators/validateEntity';
import { UpdateResponse } from '../../types/response/response.interface';
import FindBy from './dto/FindBy';

class AvailabilityService implements IAvailabilityService {
  constructor(private repository: IAvailabilityRepository) {}

  async create(data: CreateRequest): Promise<Availability> {
    const availability = await this.repository.create(data);
    const validationResult = await validationEntity(Availability, availability);

    if (validationResult.success === false) {
      throw new UnprocessableEntityError(
        `Failed to create new availability : ${validationResult.errors}`
      );
    }

    const result = await this.repository.save(availability);

    return result;
  }

  async getAll(userId: string): Promise<Availability[]> {
    return await this.repository.getAllAvailabilitiesByUserId(userId);
  }

  async findBy(findBy: FindBy): Promise<Availability | null> {
    const availability = await this.repository.findBy(findBy);

    if (!availability) {
      throw new EntityNotFoundError(
        Availability.name,
        `${findBy.userId},${findBy.shiftId}`
      );
    }

    return availability;
  }

  async updateById(data: UpdateRequest): Promise<UpdateResponse> {
    const findBy = plainToInstance(FindBy, data);
    const availability = await this.repository.findBy(findBy);
    plainToInstance(FindBy, data);

    if (!availability) {
      throw new EntityNotFoundError(Availability.name, data.shiftId);
    }

    const entity = plainToInstance(Availability, {
      ...availability,
      ...data,
    });
    const validationResult = await validationEntity(Availability, entity);

    if (validationResult.success === false) {
      throw new UnprocessableEntityError(
        `Availability with Id: ${data.shiftId}, Failed to update: ${validationResult.errors}`
      );
    }

    await this.repository.update(entity);
    return {
      success: true,
      message: 'Availability updated successfully',
    };
  }

  async delete(req: DeleteRequest): Promise<UpdateResponse> {
    const result = await this.repository.deleteById(req);

    if (!result) {
      throw new EntityNotFoundError(Availability.name, req.userId);
    }

    return {
      success: true,
      message: 'Availability updated successfully',
    };
  }
}

export default AvailabilityService;
