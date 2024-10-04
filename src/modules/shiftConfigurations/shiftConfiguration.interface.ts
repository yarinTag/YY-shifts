import { Request, Response } from "express";
import { CreateRequest } from "./dto/CreateRequest";
import { ShiftConfiguration } from "./shiftConfiguration.schema";
import { UpdateRequest } from "./dto/UpdateRequest";
import { UpdateResult } from "typeorm";

export interface IShiftConfigurationController {
  create(req: Request, res: Response): Promise<Response>;
  getAll(req: Request, res: Response): Promise<Response>;
  getById(req: Request, res: Response): Promise<Response>;
  update(req: Request, res: Response): Promise<Response>;
  delete(req: Request, res: Response): Promise<Response>;
}

export interface IShiftConfigurationService {
  create(data: CreateRequest): Promise<ShiftConfiguration>;
  getAll(workCycleConfigurationId: string): Promise<ShiftConfiguration[]>;
  getById(id: string): Promise<ShiftConfiguration | null>;
  updateById(data: UpdateRequest): Promise<{
    sucsses: boolean;
    message: string;
  }>;
  delete(id: string): Promise<{
    sucsses: boolean;
    message: string;
  }>;
}

export interface IShiftConfigurationRepository {
  create(req: CreateRequest): Promise<ShiftConfiguration>;
  update(entity: ShiftConfiguration): Promise<UpdateResult>;
  save(shifConfiguration: ShiftConfiguration): Promise<ShiftConfiguration>;
  findById(id: string): Promise<ShiftConfiguration | null>;
  findAll(): Promise<ShiftConfiguration[]>;
  getAllShifts(id: string): Promise<ShiftConfiguration[]>;
  delete(id: string): Promise<ShiftConfiguration | null>;
}
