import { Router } from 'express';
import { IsEmail, IsEmpty, IsPhoneNumber, IsString, Length } from 'class-validator';

import UserController from '../modules/users/user.controller';
import { validationMiddleware } from '../middlewares/validate';

const router = Router();

router.get('/users', UserController.verifyToken, UserController.getAllUsers);
router.post('/sign-in', UserController.signIn);

class UserCreateRequest {
  @IsString()
  @Length(1, 50)
  name: string;
  @IsEmail()
  email: string;
  @IsPhoneNumber('IL')
  phone: string;
}
router.post(
  '/users',
  validationMiddleware(UserCreateRequest),
  UserController.createUser
);
// router.get('/users/:id');

export default router;
