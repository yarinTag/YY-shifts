import { Request, Response } from 'express';
import { CreateRequest } from './dto/CreateRequest';
import { Availability } from './availability.schema';
import { UpdateRequest } from './dto/UpdateRequest';
import { UpdateResult } from 'typeorm';
import { UpdateResponse } from '../../types/response/response.interface';
import { FindBy } from './dto/FIndBy';
import { DeleteRequest } from './dto/DeleteRequest';

export interface IAvailabilityController {
  create(req: Request, res: Response): Promise<Response>;
  getAll(req: Request, res: Response): Promise<Response>;
  findBy(req: Request, res: Response): Promise<Response>;
  update(req: Request, res: Response): Promise<Response>;
  delete(req: Request, res: Response): Promise<Response>;
}

export interface IAvailabilityService {
  create(data: CreateRequest): Promise<Availability>;
  getAll(userId: string): Promise<Availability[]>;
  findBy(findBy: FindBy): Promise<Availability | null>;
  updateById(data: UpdateRequest): Promise<UpdateResponse>;
  delete(req: DeleteRequest): Promise<UpdateResponse>;
}

export interface IAvailabilityRepository {
  getAllAvailabilitiesByUserId(userId: string): Promise<Availability[]>;
  save(availability: Availability): Promise<Availability>;
  create(req: CreateRequest): Promise<Availability>;
  update(entity: Availability): Promise<UpdateResult>;
  findBy(findBy: FindBy): Promise<Availability | null>;
  findAll(): Promise<Availability[]>;
  deleteById(req: DeleteRequest): Promise<UpdateResult>;
}
