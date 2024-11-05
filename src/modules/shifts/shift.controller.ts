import { Request, Response } from 'express';
import { IShiftService, IShiftController } from './shift.interface';

class ShiftController implements IShiftController {
  constructor(private service: IShiftService) {}

  public createShift = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const newShift = await this.service.create(req.body);

    return res.status(201).json(newShift);
  };

  public getShiftById = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const id = req.params.id;
    const shift = await this.service.getById({ id });

    return res.status(200).json(shift);
  };

  public findAllShifts = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const shifts = await this.service.findAll({ ...req.query });

    return res.status(200).json(shifts);
  };

  public updateShift = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const Updatedshift = await this.service.update({
      ...req.body,
      ...req.params,
    });
    return res.status(200).json(Updatedshift);
  };

  public deleteShift = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const id = req.params.id;
    await this.service.delete({ id });

    return res.status(200).json({
      success: true,
      message: 'Shift deactivated successfully',
    });
  };

  public generateShift = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const {workCycleId} = req.body;

    await this.service.generateShift({ id:workCycleId });

    return res.status(200).json({
      success: true,
      message: 'Shift generate successfully',
    });
  };
}

export default ShiftController;
