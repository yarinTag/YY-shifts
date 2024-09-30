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
import AsyncRouter from './AsyncRouter';

const userRouter = new AsyncRouter();

userRouter.post(
  '/sign-in',
  validationMiddleware(SingInRequest),
  UserController.signIn
);

userRouter.get(
  '/',
  RoleGuard([Role.Admin, Role.MANAGER]),
  UserController.getAllUsers
);

userRouter.post(
  '/',
  validationMiddleware(CreateUserRequest),
  checkDepartmentMiddleware,
  UserController.createUser
);

userRouter.patch(
  '/',
  validationMiddleware(UpdateUserRequest),
  UserController.updateUser
);

userRouter.delete(
  '/:phone',
  RoleGuard([Role.Admin, Role.MANAGER]),
  checkDepartmentMiddleware,
  validationMiddleware(DeleteUserRequest),
  UserController.deleteUser
);

export default userRouter;
