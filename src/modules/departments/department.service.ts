import { plainToInstance } from 'class-transformer';

import { dataSource } from '../../db';
import { Department } from './department.schema';
import { CreateRequest } from './dto/CreateRequest';
import { UpdateRequest } from './dto/UpdateRequest';
import { validationEntity } from '../../middlewares/validate';
import { DeleteRequest } from './dto/DeleteRequest';
import { GetByIdRequest } from './dto/GetByIdRequest';
import {
  EntityNotFoundError,
  UnprocessableEntityError,
} from '../../middlewares/error/ApiError';

export class DepartmentService {
  departmentRepository = dataSource.getRepository(Department);

  public async findAllDepartments() {
    const departments = await this.departmentRepository.find();

    return departments;
  }

  async findDepartmentById(req: GetByIdRequest) {
    const department = await this.departmentRepository.findOneBy({
      id: req.id,
      active: true,
    });
    if (!department) throw new EntityNotFoundError(Department.name, req.id);
    return department;
  }

  async addDepartment(req: CreateRequest) {
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

  async updateDepartment(req: UpdateRequest) {
    const department = await this.departmentRepository.findOneBy({
      id: req.id,
      active: true,
    });

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

    await this.departmentRepository.update({ id: req.id }, req);

    return {
      sucsses: true,
      message: 'Department updated successfully',
    };
  }

  async deleteDepartment(req: DeleteRequest) {
    const department = await this.departmentRepository.findOneBy({
      id: req.id,
      active: true,
    });

    if (!department) {
      throw new EntityNotFoundError(Department.name, req.id);
    }

    department.active = false;
    await this.departmentRepository.update({ id: req.id }, department);

    return {
      sucsses: true,
      message: 'Department updated successfully',
    };
  }
}
