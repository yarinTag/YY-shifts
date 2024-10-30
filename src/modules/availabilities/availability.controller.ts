import { Request, Response } from 'express';

import {
  IAvailabilityController,
  IAvailabilityService,
} from './availability.interface';
import { BadRequestError } from '../../middlewares/error/ApiError';

class AvailabilityController implements IAvailabilityController {
  constructor(private service: IAvailabilityService) {}

  public create = async (req: Request, res: Response): Promise<Response> => {
    const { userId } = req.body;

    const newAvailability = await this.service.create({
      ...req.body,
      userId: userId ?? req.userId,
    });

    if (newAvailability) return res.status(201).json(newAvailability);

    throw new BadRequestError('Error creating availability');
  };

  public getAll = async (req: Request, res: Response): Promise<Response> => {
    const { userId } = req.body;
    const availability = await this.service.getAll(userId);

    return res.status(200).json(availability);
  };

  public findBy = async (req: Request, res: Response): Promise<Response> => {
    const availability = await this.service.findBy({ ...req.query });

    return res.status(200).json(availability);
  };

  public update = async (req: Request, res: Response): Promise<Response> => {
    const updateAvailability = await this.service.updateById({
      ...req.body,
      ...req.params,
    });

    return res.status(200).json(updateAvailability);
  };

  public delete = async (req: Request, res: Response): Promise<Response> => {
    const shiftId = req.params.shiftId;
    const userId = req.userId;

    await this.service.delete({ ...req.body, shiftId, userId });

    return res.status(200).json({
      success: true,
      message: 'Availability deactivated successfully',
    });
  };
}

export default AvailabilityController;
