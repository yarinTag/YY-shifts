import { Request, Response } from 'express';

import { BadRequestError } from '../../middlewares/error/ApiError';
import { IWorkCycleController, IWorkCycleService } from './workCycle.interface';

class WorkCycleController implements IWorkCycleController {
  constructor(private service: IWorkCycleService) {}

  public create = async (req: Request, res: Response): Promise<Response> => {
    const workCycle = await this.service.create(req.body);

    if (workCycle) return res.status(201).json(workCycle);

    throw new BadRequestError('Error creating shift configuration');
  };

  public findAll = async (req: Request, res: Response): Promise<Response> => {
    const shiftsConfigurations = await this.service.findAll();

    return res.status(200).json(shiftsConfigurations);
  };

  public findBy = async (req: Request, res: Response): Promise<Response> => {
    const WorkCycle = await this.service.findBy({ ...req.query });

    return res.status(200).json(WorkCycle);
  };

  public update = async (req: Request, res: Response): Promise<Response> => {
    const updateConfiguration = await this.service.updateById({
      ...req.body,
      ...req.params,
    });

    return res.status(201).json(updateConfiguration);
  };

  public delete = async (req: Request, res: Response): Promise<Response> => {
    const updateConfiguration = await this.service.delete(req.params.id);

    return res.status(200).json({
      message: 'Shift Configuration deactivated successfully',
      user: updateConfiguration,
    });
  };
}

export default WorkCycleController;
