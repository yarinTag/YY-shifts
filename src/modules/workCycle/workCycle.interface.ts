import { Request, Response } from 'express';
import { CreateRequest } from './dto/CreateRequest';
import { UpdateRequest } from './dto/UpdateRequest';
import { UpdateResult } from 'typeorm';
import { UpdateResponse } from '../../types/response/response.interface';
import { WorkCycle } from './workCycle.schema';
import { FindBy } from './dto/FindBy';

export interface IWorkCycleController {
  create(req: Request, res: Response): Promise<Response>;
  findAll(req: Request, res: Response): Promise<Response>;
  findBy(req: Request, res: Response): Promise<Response>;
  update(req: Request, res: Response): Promise<Response>;
  delete(req: Request, res: Response): Promise<Response>;
}

export interface IWorkCycleService {
  create(data: CreateRequest): Promise<WorkCycle>;
  findAll(): Promise<WorkCycle[]>;
  findBy(req: FindBy): Promise<WorkCycle | null>;
  updateById(data: UpdateRequest): Promise<UpdateResponse>;
  delete(id: string): Promise<UpdateResponse>;
}

export interface IWorkCycleRepository {
  create(req: CreateRequest): Promise<WorkCycle>;
  update(entity: WorkCycle): Promise<UpdateResult>;
  save(shifConfiguration: WorkCycle): Promise<WorkCycle>;
  findBy(req: FindBy): Promise<WorkCycle | null>;
  findAll(): Promise<WorkCycle[]>;
  delete(id: string): Promise<WorkCycle | null>;
}
