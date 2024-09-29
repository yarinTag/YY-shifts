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
    const departmentId = req.params.id ?? req.departmentId;
    const department = await this.departmentService.findDepartmentById({
      id: departmentId,
    });

    return res.json(department);
  };

  createDepartment = async (req: Request, res: Response): Promise<Response> => {
    const response = await this.departmentService.addDepartment(req.body);
    return res.status(200).json(response);
  };

  patchDepartment = async (req: Request, res: Response): Promise<Response> => {
      const response = await this.departmentService.updateDepartment({
        ...req.body,
        ...req.params,
      });
      return res.status(200).json(response);
  };

  deleteDepartment = async (req: Request, res: Response): Promise<Response> => {
      const response = await this.departmentService.deleteDepartment({
        ...req.body,
        ...req.params,
      });

      return res.status(200).json(response);
  };
}
