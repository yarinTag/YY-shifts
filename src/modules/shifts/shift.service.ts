import { EntityNotFoundError, UpdateResult } from 'typeorm';

import { Shift } from './shift.schema';
import { GetRequest } from './dto/GetRequest';
import { CreateRequest } from './dto/CreateRequest';
import { DeleteRequest } from './dto/DeleteRequest';
import { UpdateRequest } from './dto/UpdateRequest';
import { IShiftRepository, IShiftService } from './shift.interface';
import { UpdateResponse } from '../../types/response/response.interface';
import { validationEntity } from '../../decorators/validateEntity';
import { UnprocessableEntityError } from '../../middlewares/error/ApiError';
import { plainToInstance } from 'class-transformer';

export class ShiftService implements IShiftService {
  constructor(private repository: IShiftRepository) {}

  async findAll(req: GetRequest): Promise<Shift[]> {
    const shifts = await this.repository.findAllBy(req);

    return shifts;
  }

  async create(req: CreateRequest): Promise<Shift> {
    const shift = await this.repository.create(req);
    const validationResult = await validationEntity(Shift, shift);

    if (validationResult.sucsses === false) {
      throw new UnprocessableEntityError(
        `Failed to create new shift : ${validationResult.errors}`
      );
    }

    const result = await this.repository.save(shift);

    return result;
  }

  async getById(req: GetRequest): Promise<Shift | null> {
    const shift = await this.repository.findById(req.id ?? '');

    if (!shift) {
      throw new EntityNotFoundError(Shift.name, req.id);
    }

    return shift;
  }

  async update(req: UpdateRequest): Promise<UpdateResult> {
    const shift = await this.repository.findActiveById(req.id);

    if (!shift) {
      throw new EntityNotFoundError(Shift.name, req.id);
    }

    const entity = plainToInstance(Shift, { ...shift, ...req });
    const validationResult = await validationEntity(Shift, entity);

    if (validationResult.sucsses === false) {
      throw new UnprocessableEntityError(
        `Shift with Id: ${req.id}, Failed to update: ${validationResult.errors}`
      );
    }

    return await this.repository.update(entity);
  }

  async delete(req: DeleteRequest): Promise<UpdateResponse> {
    const shift = await this.repository.deleteById(req.id);

    if (!shift) {
      throw new EntityNotFoundError(Shift.name, req.id);
    }

    return {
      success: true,
      message: 'Shift updated successfully',
    };
  }
}
