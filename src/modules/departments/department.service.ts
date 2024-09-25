import { dataSource } from '../../db';
import { Department } from './department.schema';
import { CreateRequest } from './dto/createRequest';

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
  const result = await departmentRepository.save(department);

  return result;
};
