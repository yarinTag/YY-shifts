import { UpdateResult } from 'typeorm';

import { GetByIdRequest } from './dto/GetByIdRequest';
import { UpdateRequest } from './dto/UpdateRequest';
import { Request, Response } from 'express';
import { CreateRequest } from './dto/CreateRequest';
import { WorkCycleConfiguration } from './workCycleConfiguration.schema';
import { DeleteRequest } from './dto/DeleteRequest';

export interface IWorkCycleConfigurationController {
  findAll(req: Request, res: Response): Promise<Response>;
  findById(req: Request, res: Response): Promise<Response>;
  create(req: Request, res: Response): Promise<Response>;
  patch(req: Request, res: Response): Promise<Response>;
  delete(req: Request, res: Response): Promise<Response>;
}
export interface IWorkCycleConfigurationService {
  findAll(): Promise<WorkCycleConfiguration[]>;
  findById(req: GetByIdRequest): Promise<WorkCycleConfiguration | null>;
  create(req: CreateRequest): Promise<WorkCycleConfiguration>;
  update(req: UpdateRequest): Promise<UpdateResult>;
  delete(req: DeleteRequest): Promise<WorkCycleConfiguration>;
}

export interface IWorkCycleConfigurationRepository {
  save(entity: WorkCycleConfiguration): Promise<WorkCycleConfiguration>;
  create(req: CreateRequest): WorkCycleConfiguration;
  findById(id: string): Promise<WorkCycleConfiguration | null>;
  findActiveById(
    id: string,
    relations?: string[]
  ): Promise<WorkCycleConfiguration | null>;
  findAll(): Promise<WorkCycleConfiguration[]>;
  deleteById(id: string): Promise<WorkCycleConfiguration | null>;
  update(entity: WorkCycleConfiguration): Promise<UpdateResult>;
}
