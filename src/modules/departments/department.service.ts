import { Request } from 'express';

import { dataSource } from '../../db';
import { Department } from './department.schema';

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

export const addDepartment = async (req: Request) => {
  const department = await departmentRepository.create({
    ...req.body,
  });
  const result = await departmentRepository.save(department);

  return result;
};
