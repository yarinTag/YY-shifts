import { Router } from 'express';

import { Role } from '../modules/users/user.schema';
import {
  checkDepartmentMiddleware,
  RoleGuard,
} from '../middlewares/authMiddleware';
import UserController from '../modules/users/user.controller';
import { validationMiddleware } from '../middlewares/validate';
import { SingInRequest } from '../modules/users/dto/SingInRequest';
import { CreateUserRequest } from '../modules/users/dto/CreateRequest';
import { UpdateUserRequest } from '../modules/users/dto/UpdateRequest';
import { DeleteUserRequest } from '../modules/users/dto/DeleteRequest';

const router = Router();

router.post(
  '/sign-in',
  validationMiddleware(SingInRequest),
  UserController.signIn
);

router.get(
  '/',
  RoleGuard([Role.Admin, Role.MANAGER]),
  UserController.getAllUsers
);

router.post(
  '/',
  validationMiddleware(CreateUserRequest),
  checkDepartmentMiddleware,
  UserController.createUser
);

router.patch(
  '/',
  validationMiddleware(UpdateUserRequest),
  UserController.updateUser
);

router.delete(
  '/:phone',
  RoleGuard([Role.Admin, Role.MANAGER]),
  checkDepartmentMiddleware,
  validationMiddleware(DeleteUserRequest),
  UserController.deleteUser
);

export default router;
