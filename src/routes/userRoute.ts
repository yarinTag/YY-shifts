import { Router } from 'express';

import { Role } from '../modules/users/user.schema';
import {
  checkDepartmentMiddleware,
  RoleGuard,
} from '../middlewares/authMiddleware';
import UserController from '../modules/users/user.controller';
import { validationMiddleware } from '../middlewares/validate';
import { SingInRequest } from '../modules/users/dto/SingInRequest';
import { verifyTokenMiddleware } from '../middlewares/authMiddleware';
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
  verifyTokenMiddleware,
  RoleGuard([Role.Admin, Role.MANAGER]),
  UserController.getAllUsers
);

router.post(
  '/',
  validationMiddleware(CreateUserRequest),
  UserController.createUser
);

router.patch(
  '/',
  verifyTokenMiddleware,
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
// router.get('/users/:id');

export default router;
