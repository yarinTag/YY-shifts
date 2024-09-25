import { Router } from 'express';
import { createUser, getAllUsers } from '../modules/users/user.controller';
import { IsEmail, IsPhoneNumber, IsString, Length, Min } from 'class-validator';
import { validationMiddleware } from '../middlewares/validate';

const router = Router();

router.get('/users', getAllUsers);

class UserCreateRequest {
  @IsString()
  @Length(1, 50)
  name: string;
  @IsEmail()
  email: string;
  @IsPhoneNumber('IL')
  phone: string;
}
router.post('/users', validationMiddleware(UserCreateRequest), createUser);
// router.get('/users/:id');

export default router;
