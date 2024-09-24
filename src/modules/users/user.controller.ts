import { Request, Response } from 'express';
import { dataSource } from '../../db';
import { User } from './user.schema';
import { UserService } from './user.service';

const userRepository = dataSource.getRepository(User);
const userService = new UserService;

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await userRepository.find();
  res.json(users);
};

export const createUser = async (req: Request, res: Response) => {
  const results = await userService.createUser(req.body);
  return res.json(results);
};
