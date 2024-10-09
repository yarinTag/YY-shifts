import { Request, Response } from 'express';
import { CreateRequest } from './dto/CreateRequest';
import { Availability } from './availability.schema';
import { UpdateRequest } from './dto/UpdateRequest';
import { UpdateResult } from 'typeorm';
import { UpdateResponse } from '../../types/response/response.interface';

export interface IAvailabilityController {
  create(req: Request, res: Response): Promise<Response>;
  getAll(req: Request, res: Response): Promise<Response>;
  getById(req: Request, res: Response): Promise<Response>;
  update(req: Request, res: Response): Promise<Response>;
}

export interface IAvailabilityService {
  create(data: CreateRequest): Promise<Availability>;
  getAll(userId: string): Promise<Availability[]>;
  getById(id: string): Promise<Availability | null>;
  updateById(data: UpdateRequest): Promise<UpdateResponse>;
}

export interface IAvailabilityRepository {
  getAllAvailabilitiesByUserId(userId: string): Promise<Availability[]>;
  save(shifConfiguration: Availability): Promise<Availability>;
  create(req: CreateRequest): Promise<Availability>;
  update(entity: Availability): Promise<UpdateResult>;
  findById(id: string): Promise<Availability | null>;
  findAll(): Promise<Availability[]>;
}
