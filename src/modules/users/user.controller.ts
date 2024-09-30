import { Request, Response } from 'express';

import { UserService } from './user.service';
import {
  BadRequestError,
  UnauthorizedError
} from '../../middlewares/error/ApiError';

class UserController {
  private userService = new UserService();

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
    const users = await this.userService.getAllUsers(currentUserId);
    return res.json(users);
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
    const phone = req.params.phone;

    const updatedUser = await this.userService.deleteUser(phone);
    return res.status(200).json({
      message: 'User deactivated successfully',
      user: updatedUser,
    });
  };
}

export default new UserController();
