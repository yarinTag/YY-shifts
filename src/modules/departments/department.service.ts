import { plainToInstance } from 'class-transformer';

import { dataSource } from '../../db';
import { Department } from './department.schema';
import { CreateRequest } from './dto/CreateRequest';
import { UpdateRequest } from './dto/UpdateRequest';
import { DeleteRequest } from './dto/DeleteRequest';
import { GetByIdRequest } from './dto/GetByIdRequest';
import {
  EntityNotFoundError,
  UnprocessableEntityError,
} from '../../middlewares/error/ApiError';
import { DepartmentRepository } from './department.repository';
import { validationEntity } from '../../decorators/validateEntity';
import { IDepartmentService } from './department.interface';

export class DepartmentService implements IDepartmentService {
  constructor(private departmentRepository: DepartmentRepository) {}

  async findAll() {
    const departments = await this.departmentRepository.findAll();

    return departments;
  }

  async findById(req: GetByIdRequest) {
    const department = await this.departmentRepository.findById(req.id);

    if (!department) {
      throw new EntityNotFoundError(Department.name, req.id);
    }

    return department;
  }

  async create(req: CreateRequest) {
    const department = await this.departmentRepository.create(req);
    const validationResult = await validationEntity(Department, department);

    if (validationResult.sucsses === false) {
      throw new UnprocessableEntityError(
        `Failed to create new Department : ${validationResult.errors}`
      );
    }

    const result = await this.departmentRepository.save(department);

    return result;
  }

  async update(req: UpdateRequest) {
    const department = await this.departmentRepository.findActiveById(req.id);

    if (!department) {
      throw new EntityNotFoundError(Department.name, req.id);
    }

    const entity = plainToInstance(Department, { ...department, ...req });
    const validationResult = await validationEntity(Department, entity);

    if (validationResult.sucsses === false) {
      throw new UnprocessableEntityError(
        `Departments with Id: ${req.id}, Failed to update: ${validationResult.errors}`
      );
    }

    return await this.departmentRepository.update({ id: req.id }, entity);
  }

  async deleteDepartment(req: DeleteRequest) {
    const department = await this.departmentRepository.deleteById(req.id);

    if (!department) {
      throw new EntityNotFoundError(Department.name, req.id);
    }

    return {
      sucsses: true,
      message: 'Department updated successfully',
    };
  }
}
