import { Request, Response } from 'express';
import { IWorkCycleConfigurationController } from './workCycleConfiguration.interface';

export class WorkCycleConfigurationController
  implements IWorkCycleConfigurationController
{
  findAll(req: Request, res: Response): Promise<Response> {
    throw new Error('Method not implemented.');
  }
  findById(req: Request, res: Response): Promise<Response> {
    throw new Error('Method not implemented.');
  }
  create(req: Request, res: Response): Promise<Response> {
    throw new Error('Method not implemented.');
  }
  patch(req: Request, res: Response): Promise<Response> {
    throw new Error('Method not implemented.');
  }
  delete(req: Request, res: Response): Promise<Response> {
    throw new Error('Method not implemented.');
  }
}
