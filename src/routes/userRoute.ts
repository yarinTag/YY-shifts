import { Router } from 'express';
import { IsEmail, IsOptional, IsPhoneNumber, IsString, Length, MinLength } from 'class-validator';

import UserController from '../modules/users/user.controller';
import { validationMiddleware } from '../middlewares/validate';
import { IsUnique } from '../middlewares/customDecorators';
import { Gender } from '../modules/users/user.schema';

const router = Router();

router.get('/users', UserController.verifyToken, UserController.getAllUsers);

class SingInRequest {
    @MinLength(8)
    password: string;
    @IsString()
    @IsPhoneNumber('IL')
    phone: string;
  }
router.post('/sign-in', validationMiddleware(SingInRequest),UserController.signIn);

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

export class UpdateUserRequest {
    @IsOptional()
    @IsString()
    @Length(3,50)
    name?: string;
  
    @IsOptional()
    @IsEmail({}, { message: 'Invalid email format' })
    @IsUnique({ message: 'Email is already in use' })
    email?: string;
  
    @IsOptional()
    @IsPhoneNumber('IL', { message: 'Invalid phone number format' })
    @IsUnique({ message: 'Phone number is already in use' })
    phone?: string;
  
    @IsOptional()
    @IsString()
    gender?: Gender;
  }
  router.patch(
    '/users/',
    validationMiddleware(UpdateUserRequest),
    UserController.updateUser
  );
// router.get('/users/:id');

export default router;
