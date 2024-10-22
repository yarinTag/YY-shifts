import { UpdateResult } from 'typeorm';
import { Request, Response } from 'express';

import { User } from './user.schema';
import { SignInRequest } from './dto/SignInRequest';
import { GetByIdRequest } from './dto/GetByIdRequest';
import { UpdateUserRequest } from './dto/UpdateRequest';
import { CreateUserRequest } from './dto/CreateRequest';
import { UpdateResponse } from '../../types/response/response.interface';

export interface IUserController {
  signIn(req: Request, res: Response): Promise<Response>;
  createUser(req: Request, res: Response): Promise<Response>;
  getAllUsers(req: Request, res: Response): Promise<Response>;
  getUserById(req: Request, res: Response): Promise<Response>;
  updateUser(req: Request, res: Response): Promise<Response>;
  deleteUser(req: Request, res: Response): Promise<Response>;
}

export interface IUserService {
  createUser(data: CreateUserRequest): Promise<User>;
  signIn(req: SignInRequest): Promise<string | undefined>;
  getAllUsers(id: string, departmentId?: string): Promise<User[]>;
  getUsersByDepartmentId(id: string, departmentId: string): Promise<User[]>;
  findUserByIdAndDepartment(
    id: string,
    departmentId: string
  ): Promise<User | null>;
  findUserById(data: GetByIdRequest): Promise<User>;
  updateUserById(data: UpdateUserRequest, id: string): Promise<UpdateResponse>;
  updateUser(
    data: UpdateUserRequest,
    userId: string | undefined
  ): Promise<UpdateResponse>;
  deleteUser(id: string): Promise<User>;
}

export interface IUserRepository {
  deleteUser(id: string): Promise<User | null>;
  update(entity: User): Promise<UpdateResult>;
  findById(id: string): Promise<User | null>;
  findActiveById(userId: string, relations?: string[]): Promise<User | null>;
  findByIdAndDepartment(id: string, departmentId: string): Promise<User | null>;
  getAllUsersByDepartmentId(id: string, departmentId: string): Promise<User[]>;
  getAllUsers(id: string): Promise<User[]>;
  findByPhone(phone: string): Promise<User | null>;
  save(user: User): Promise<User>;
  create(req: CreateUserRequest): User;
}
