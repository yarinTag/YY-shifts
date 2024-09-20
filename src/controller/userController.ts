import { Request, Response } from 'express';
import { dataSource } from '../db';
import { User } from '../model/user';
// get all users

const userRepository = dataSource.getRepository(User);

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await userRepository.find();
  res.json(users);
};

export const createUser = async (req: Request, res: Response) => {
  const user = await userRepository.create(req.body);
  const results = await userRepository.save(user);
  return res.send(results);
};
