import { plainToInstance } from 'class-transformer';
import { dataSource } from '../../db';
import { Department } from './department.schema';
import { CreateRequest } from './dto/CreateRequest';
import { UpdateRequest } from './dto/UpdateRequest';
import { validate } from 'class-validator';
import { validationEntity } from '../../middlewares/validate';

const departmentRepository = dataSource.getRepository(Department);
export const findAllDepartments = async () => {
  const departments = await departmentRepository.find();

  return departments;
};

export const findDepartmentById = async (departmentId: string) => {
  const department = await departmentRepository.findOneBy({
    id: departmentId,
  });

  return department;
};

export const addDepartment = async (req: CreateRequest) => {
  const department = await departmentRepository.create(req);
  const validationResult = await validationEntity(Department, department);

  if (validationResult.sucsses === false) {
    throw new Error(
      `Failed to create new Department : ${validationResult.errors}`
    );
  }

  const result = await departmentRepository.save(department);

  return result;
};

export const updateDepartment = async (req: UpdateRequest) => {
  const department = await departmentRepository.findOneBy({
    id: req.id,
  });

  if (!department) {
    throw new Error(`Departments with Id: ${req.id} not found`);
  }

  const entity = plainToInstance(Department, { ...department, ...req });
  const validationResult = await validationEntity(Department, entity);

  if (validationResult.sucsses === false) {
    throw new Error(
      `Departments with Id: ${req.id}, Failed to update: ${validationResult.errors}`
    );
  }

  await departmentRepository.update({ id: req.id }, req);

  return {
    sucsses: true,
    message: 'Department updated successfully',
  };
};
