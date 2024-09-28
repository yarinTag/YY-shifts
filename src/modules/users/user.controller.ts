import { Request, Response } from 'express';

import { UserService } from './user.service';

class UserController {
  private userService = new UserService();

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
    return res.status(401).json({ message: 'Invalid credentials' });
  };

  public getAllUsers = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const currentUserId = req.userId ?? '';
    try {
      const users = await this.userService.getAllUsers(currentUserId);
      return res.json(users);
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  };

  public createUser = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const newUser = await this.userService.createUser(req.body);
      return res.status(201).json(newUser);
    } catch (error) {
      return res.status(500).json({ error: 'Error creating user' });
    }
  };

  public updateUser = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const updateUser = await this.userService.updateUser(
        req.body,
        req.userId
      );
      return res.status(201).json(updateUser);
    } catch (error) {
      return res.status(500).json({ error: 'Error updating user' });
    }
  };

  public deleteUser = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const phone = req.params.phone;

    try {
      const updatedUser = await this.userService.deleteUser(phone);

      return res
        .status(200)
        .json({ message: 'User deactivated successfully', user: updatedUser });
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Error deactivating user', error });
    }
  };
}

export default new UserController();
