import { Request, Response } from 'express';
import { DepartmentService } from './department.service';
import { IDepartmentController } from './department.interface';

export class DepartmentController implements IDepartmentController {
  constructor(private departmentService: DepartmentService) {}

  public getAllDepartments = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const departments = await this.departmentService.findAll();

    return res.json(departments);
  };

  getDepartmentById = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const departmentId = req.params.id ?? req.departmentId;
    const department = await this.departmentService.findById({
      id: departmentId,
    });

    return res.json(department);
  };

  createDepartment = async (req: Request, res: Response): Promise<Response> => {
    const response = await this.departmentService.create(req.body);
    return res.status(200).json(response);
  };

  patchDepartment = async (req: Request, res: Response): Promise<Response> => {
    const response = await this.departmentService.update({
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
