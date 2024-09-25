import { dataSource } from '../../db';
import { Department } from './department.schema';
import { CreateRequest } from './dto/CreateRequest';
import { UpdateRequest } from './dto/UpdateRequest';

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

export const updateDepartment = async (req: UpdateRequest) => {
  const department = await departmentRepository.findOneBy({
    id: req.id,
  });

  if (!department) {
    throw new Error(`Departments with Id: ${req.id} not found`);
  }

  const result = await departmentRepository.update({ id: req.id }, req);

  return { message: 'Department updated successfully', response: result };
};
