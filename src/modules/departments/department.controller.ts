import { Request, Response } from 'express';
import { DepartmentService } from './department.service';

const departmentService = new DepartmentService();

export const getAllDepartments = async (req: Request, res: Response) => {
  const departments = await departmentService.findAllDepartments();
  res.json(departments);
};

export const getDepartmentById = async (req: Request, res: Response) => {
  const department = await departmentService.findDepartmentById(req.params.id);

  res.json(department);
};

export const createDepartment = async (req: Request, res: Response) => {
  try {
    const response = await departmentService.addDepartment(req.body);
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
    const response = await departmentService.updateDepartment({
      ...req.body,
      ...req.params,
    });

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
