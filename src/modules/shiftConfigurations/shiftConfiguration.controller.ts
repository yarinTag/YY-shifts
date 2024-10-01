import { Request, Response } from 'express';

import {
  IShiftConfigurationController,
  IShiftConfigurationService,
} from './shiftConfiguration.interface';
import { BadRequestError } from '../../middlewares/error/ApiError';

class ShiftConfigurationController implements IShiftConfigurationController {
  constructor(private service: IShiftConfigurationService) {}

  public create = async (req: Request, res: Response): Promise<Response> => {
    const newShiftConfiguration = await this.service.create(req.body);

    if (newShiftConfiguration)
      return res.status(201).json(newShiftConfiguration);

    throw new BadRequestError('Error creating shift configuration');
  };

  public getAll = async (req: Request, res: Response): Promise<Response> => {
    const shiftsConfigurations = await this.service.getAll(req.body);

    return res.json(shiftsConfigurations);
  };

  public getById = async (req: Request, res: Response): Promise<Response> => {
    const id = req.params.id;
    const shiftConfiguration = await this.service.getById(id);

    return res.json(shiftConfiguration);
  };

  public update = async (req: Request, res: Response): Promise<Response> => {
    const updateConfiguration = await this.service.updateById(req.body);

    return res.status(201).json(updateConfiguration);
  };

  public delete = async (req: Request, res: Response): Promise<Response> => {
    const updateConfiguration = await this.service.delete(req.body);

    return res.status(200).json({
      message: 'Shift Configuration deactivated successfully',
      user: updateConfiguration,
    });
  };
}

export default ShiftConfigurationController;
