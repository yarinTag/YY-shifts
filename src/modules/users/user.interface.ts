import { Request, Response } from 'express';

import { User } from './user.schema';
import { SignInRequest } from './dto/SignInRequest';
import { GetByIdRequest } from './dto/GetByIdRequest';
import { UpdateUserRequest } from './dto/UpdateRequest';
import { CreateUserRequest } from './dto/CreateRequest';

export interface IUserController {
  signIn: (req: Request, res: Response) => Promise<Response>;
  createUser: (req: Request, res: Response) => Promise<Response>;
  getAllUsers: (req: Request, res: Response) => Promise<Response>;
  getUserById: (req: Request, res: Response) => Promise<Response>;
  updateUser: (req: Request, res: Response) => Promise<Response>;
  deleteUser: (req: Request, res: Response) => Promise<Response>;
}

export interface IUserService {
  createUser: (data: CreateUserRequest) => Promise<User>;
  signIn: (authCredentials: SignInRequest) => Promise<string | undefined>;
  getAllUsers: (id: string, departmentId?: string) => Promise<User[]>;
  getUsersByDepartmentId: (id: string, departmentId: string) => Promise<User[]>;
  findUserByIdAndDepartment: (
    id: string,
    departmentId: string
  ) => Promise<User | null>;
  findUserById: (data: GetByIdRequest) => Promise<User>;
  updateUserById: (
    data: UpdateUserRequest,
    id: string
  ) => Promise<{
    sucsses: boolean;
    message: string;
  }>;
  updateUser: (
    data: UpdateUserRequest,
    userId: string | undefined
  ) => Promise<{
    sucsses: boolean;
    message: string;
  }>;
  deleteUser: (id: string) => Promise<User>;
}
