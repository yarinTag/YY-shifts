import { Request, Response } from 'express';

import {
  BadRequestError,
  UnauthorizedError,
} from '../../middlewares/error/ApiError';
import { IUserController, IUserService } from './user.interface';

class UserController implements IUserController {
  constructor(private userService: IUserService) {}

  public createUser = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const newUser = await this.userService.createUser(req.body);
    if (newUser) return res.status(201).json(newUser);

    throw new BadRequestError('Error creating user');
  };

  public signIn = async (req: Request, res: Response): Promise<Response> => {
    const token = await this.userService.signIn(req.body);
    if (token) {
      res.cookie('token', token, {
        httpOnly: true, // This prevents client-side JavaScript from accessing the cookie
        secure: true, // Only send the cookie over HTTPS in production
        sameSite: 'strict', // Helps to mitigate CSRF attacks
        path: '/',
      });

      return res.json({ data: token, message: 'Login successful' });
    }
    throw new UnauthorizedError('Invalid credentials');
  };

  public getAllUsers = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const currentUserId = req.userId ?? '';
    const departmentId = req.departmentId;
    const users = await this.userService.getAllUsers(
      currentUserId,
      departmentId
    );
    return res.json(users);
  };

  public getUserById = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const id = req.params.id ?? req.userId;
    const user = await this.userService.findUserById({
      departmentId: req.departmentId,
      userId: id,
      role: req.userRole,
    });

    return res.json(user);
  };

  public updateUser = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const updateUser = await this.userService.updateUser(req.body, req.userId);
    return res.status(201).json(updateUser);
  };

  public deleteUser = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const id = req.params.id;

    const updatedUser = await this.userService.deleteUser(id);
    return res.status(200).json({
      message: 'User deactivated successfully',
      user: updatedUser,
    });
  };
}

export default UserController;
