import { Request, Response } from 'express';
import {
  findAllDepartments,
  addDepartment,
  findDepartmentById,
} from './department.service';

export const getAllDepartments = async (req: Request, res: Response) => {
  const departments = await findAllDepartments();
  res.json(departments);
};

export const getDepartmentById = async (req: Request, res: Response) => {
  console.log(req.params.id);
  const department = findDepartmentById(req.params.id);

  res.json(department);
};

export const createDepartment = async (req: Request, res: Response) => {
  const respone = await addDepartment(req.body).catch((err) => {
    console.error('Failed create new Department: ', err);

    return err.detail;
  });
  res.json(respone);
};
