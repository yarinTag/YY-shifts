import { Router } from 'express';
import { createUser, getAllUsers } from '../modules/users/user.controller';
import { IsEmail, IsPhoneNumber, IsString } from 'class-validator';
import { validationMiddleware } from '../middlewares/validate';

const router = Router();

class UserCreateRequest {
  @IsString()
  name: string;
  @IsEmail()
  email: string;
  @IsPhoneNumber()
  phone: string;
}

router.get('/users', getAllUsers);
router.post('/users', validationMiddleware(UserCreateRequest), createUser);
// router.get('/users/:id');

export default router;
