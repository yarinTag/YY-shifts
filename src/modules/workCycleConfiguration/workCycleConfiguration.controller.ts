import { Request, Response } from 'express';
import {
  IWorkCycleConfigurationController,
  IWorkCycleConfigurationService,
} from './workCycleConfiguration.interface';

export class WorkCycleConfigurationController
  implements IWorkCycleConfigurationController
{
  constructor(private service: IWorkCycleConfigurationService) {}

  findAll = async (req: Request, res: Response): Promise<Response> => {
    const response = await this.service.findAll();

    return res.json(response);
  };
  findById = async (req: Request, res: Response): Promise<Response> => {
    const response = await this.service.findById({ id: req.params.id });

    return res.json(response);
  };
  create = async (req: Request, res: Response): Promise<Response> => {
    const response = await this.service.create(req.body);
    return res.status(200).json(response);
  };
  patch = async (req: Request, res: Response): Promise<Response> => {
    const response = await this.service.update({
      ...req.body,
      ...req.params,
    });
    return res.status(200).json(response);
  };
  delete = async (req: Request, res: Response): Promise<Response> => {
    const response = await this.service.delete({
      ...req.body,
      ...req.params,
    });

    return res.status(200).json(response);
  };
}
