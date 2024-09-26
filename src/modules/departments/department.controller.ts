import { Request, Response } from 'express';
import {
  findAllDepartments,
  addDepartment,
  findDepartmentById,
  updateDepartment,
} from './department.service';

export const getAllDepartments = async (req: Request, res: Response) => {
  const departments = await findAllDepartments();
  res.json(departments);
};

export const getDepartmentById = async (req: Request, res: Response) => {
  const department = await findDepartmentById(req.params.id);

  res.json(department);
};

export const createDepartment = async (req: Request, res: Response) => {
  try {
    const response = await addDepartment(req.body);
    return res.status(200).json(response);
  } catch (err) {
    console.error('Failed create new Department: ', err);

    if (err instanceof Error) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    } else {
      return res.status(500).json(err);
    }
  }
};

export const patchDepartment = async (req: Request, res: Response) => {
  try {
    const response = await updateDepartment({ ...req.body, ...req.params });

    return res.status(200).json(response);
  } catch (err) {
    console.error('Failed to update Department: ', err);

    if (err instanceof Error) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    } else {
      return res.status(500).json(err);
    }
  }
};
