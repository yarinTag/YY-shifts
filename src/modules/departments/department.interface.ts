import { UpdateResult } from 'typeorm';
import { Department } from './department.schema';
import { CreateRequest } from './dto/CreateRequest';
import { DeleteRequest } from './dto/DeleteRequest';
import { GetByIdRequest } from './dto/GetByIdRequest';
import { UpdateRequest } from './dto/UpdateRequest';
import { Request, Response } from 'express';

export interface IDepartmentController {
  getAllDepartments(req: Request, res: Response): Promise<Response>;
  getDepartmentById(req: Request, res: Response): Promise<Response>;
  createDepartment(req: Request, res: Response): Promise<Response>;
  patchDepartment(req: Request, res: Response): Promise<Response>;
  deleteDepartment(req: Request, res: Response): Promise<Response>;
}
export interface IDepartmentService {
  findAll(): Promise<Department[]>;
  findById(req: GetByIdRequest): Promise<Department | null>;
  create(req: CreateRequest): Promise<Department>;
  update(req: UpdateRequest): Promise<UpdateResult>;
  deleteDepartment(req: DeleteRequest): object;
}

export interface IDepartmentRepository {
  save(department: Department): Promise<Department>;
  create(req: CreateRequest): Department;
  findById(id: string): Promise<Department | null>;
  findActiveById(id: string, relations?: string[]): Promise<Department | null>;
  findAll(): Promise<Department[]>;
  deleteById(id: string): Promise<Department | null>;
  update(entity: Department): Promise<UpdateResult>;
}
