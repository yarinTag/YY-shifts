import { Request, Response } from 'express';

import {
  IAvailabilityController,
  IAvailabilityService,
} from './availability.interface';
import { BadRequestError } from '../../middlewares/error/ApiError';

class AvailabilityController implements IAvailabilityController {
  constructor(private service: IAvailabilityService) {}

  public create = async (req: Request, res: Response): Promise<Response> => {
    const newAvailability = await this.service.create(req.body);

    if (newAvailability) return res.status(201).json(newAvailability);

    throw new BadRequestError('Error creating availability');
  };

  public getAll = async (req: Request, res: Response): Promise<Response> => {
    const { userId } = req.body;
    const availability = await this.service.getAll(userId);

    return res.status(200).json(availability);
  };

  public getById = async (req: Request, res: Response): Promise<Response> => {
    const id = req.params.id;
    const availability = await this.service.getById(id);

    return res.status(200).json(availability);
  };

  public update = async (req: Request, res: Response): Promise<Response> => {
    const updateAvailability = await this.service.updateById({
      ...req.body,
      ...req.params,
    });

    return res.status(201).json(updateAvailability);
  };
}

export default AvailabilityController;
