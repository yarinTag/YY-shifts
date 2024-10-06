import { Request, Response } from 'express';
import { CreateRequest } from './dto/CreateRequest';
import { UpdateRequest } from './dto/UpdateRequest';
import { UpdateResult } from 'typeorm';
import { UpdateResponse } from '../../types/response/response.interface';
import { WorkCycle } from './workCycle.schema';

export interface IWorkCycleController {
  create(req: Request, res: Response): Promise<Response>;
  getAll(req: Request, res: Response): Promise<Response>;
  getById(req: Request, res: Response): Promise<Response>;
  update(req: Request, res: Response): Promise<Response>;
  delete(req: Request, res: Response): Promise<Response>;
}

export interface IWorkCycleService {
  create(data: CreateRequest): Promise<WorkCycle>;
  getAll(workCycleConfigurationId: string): Promise<WorkCycle[]>;
  getById(id: string): Promise<WorkCycle | null>;
  updateById(data: UpdateRequest): Promise<UpdateResponse>;
  delete(id: string): Promise<UpdateResponse>;
}

export interface IWorkCycleRepository {
  create(req: CreateRequest): Promise<WorkCycle>;
  update(entity: WorkCycle): Promise<UpdateResult>;
  save(shifConfiguration: WorkCycle): Promise<WorkCycle>;
  findById(id: string): Promise<WorkCycle | null>;
  findAll(): Promise<WorkCycle[]>;
  getAllShifts(id: string): Promise<WorkCycle[]>;
  delete(id: string): Promise<WorkCycle | null>;
}
