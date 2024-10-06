import { UpdateResult } from 'typeorm';
import { Request, Response } from 'express';

import { Shift } from './shift.schema';
import { GetRequest } from './dto/GetRequest';
import { CreateRequest } from './dto/CreateRequest';
import { UpdateRequest } from './dto/UpdateRequest';
import { DeleteRequest } from './dto/DeleteRequest';
import { UpdateResponse } from '../../types/response/response.interface';

export interface IShiftController {
  createShift(req: Request, res: Response): Promise<Response>;
  updateShift(req: Request, res: Response): Promise<Response>;
  deleteShift(req: Request, res: Response): Promise<Response>;
  getShiftById(req: Request, res: Response): Promise<Response>;
  findAllShifts(req: Request, res: Response): Promise<Response>;
}

export interface IShiftService {
  findAll(req: GetRequest): Promise<Shift[]>;
  create(req: CreateRequest): Promise<Shift>;
  getById(req: GetRequest): Promise<Shift | null>;
  update(req: UpdateRequest): Promise<UpdateResult>;
  delete(req: DeleteRequest): Promise<UpdateResponse>;
}

export interface IShiftRepository {
  create(req: CreateRequest): Shift;
  findById(id: string): Promise<Shift | null>;
  findActiveById(id: string, relations?: string[]): Promise<Shift | null>;
  findAllBy(req: GetRequest): Promise<Shift[]>;
  deleteById(id: string): Promise<Shift | null>;
  update(entity: Shift): Promise<UpdateResult>;
  save(shift: Shift): Promise<Shift>;
}
