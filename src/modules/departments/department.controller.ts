import { Request, Response } from 'express';
import { DepartmentService } from './department.service';

export class DepartmentController {
  private departmentService = new DepartmentService();

  getAllDepartments = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const departments = await this.departmentService.findAllDepartments();

    return res.json(departments);
  };

  getDepartmentById = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const department = await this.departmentService.findDepartmentById(
      req.params.id
    );

    return res.json(department);
  };

  createDepartment = async (req: Request, res: Response): Promise<Response> => {
    try {
      const response = await this.departmentService.addDepartment(req.body);
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

  patchDepartment = async (req: Request, res: Response): Promise<Response> => {
    try {
      const response = await this.departmentService.updateDepartment({
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

  deleteDepartment = async (req: Request, res: Response): Promise<Response> => {
    try {
      const response = await this.departmentService.deleteDepartment({
        ...req.body,
        ...req.params,
      });

      return res.status(200).json(response);
    } catch (err) {
      console.error('Failed to delete Department: ', err);

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
}
