import {
  checkDepartmentMiddleware,
  RoleGuard,
} from '../middlewares/authMiddleware';
import { dataSource } from '../db';
import AsyncRouter from './AsyncRouter';
import { Role } from '../types/enum/Role';
import { UserService } from '../modules/users/user.service';
import UserController from '../modules/users/user.controller';
import { validationMiddleware } from '../middlewares/validate';
import { UserRepository } from '../modules/users/user.repository';
import { SingInRequest } from '../modules/users/dto/SingInRequest';
import { CreateUserRequest } from '../modules/users/dto/CreateRequest';
import { UpdateUserRequest } from '../modules/users/dto/UpdateRequest';
import { DeleteUserRequest } from '../modules/users/dto/DeleteRequest';
import { BaseRepository } from '../modules/BaseRepository';
import { User } from '../modules/users/user.schema';

class UserRouter extends AsyncRouter {
  constructor(private userController: UserController) {
    super();
    this.initializeRoutes();
  }

  static create() {
    const userRepository = new UserRepository((new BaseRepository(User, dataSource)));
    const userService = new UserService(userRepository);
    const userController = new UserController(userService);
    return new UserRouter(userController);
  }

  private initializeRoutes() {
    this.post(
      '/sign-in',
      validationMiddleware(SingInRequest),
      this.userController.signIn
    );

    this.get(
      '/all',
      RoleGuard([Role.ADMIN, Role.MANAGER]),
      this.userController.getAllUsers
    );

    this.get('/', checkDepartmentMiddleware, this.userController.getUserById);

    this.get(
      '/:id',
      RoleGuard([Role.ADMIN, Role.MANAGER]),
      checkDepartmentMiddleware,
      this.userController.getUserById
    );

    this.post(
      '/',
      validationMiddleware(CreateUserRequest),
      checkDepartmentMiddleware,
      this.userController.createUser
    );

    this.patch(
      '/',
      validationMiddleware(UpdateUserRequest),
      this.userController.updateUser
    );

    this.delete(
      '/:id',
      RoleGuard([Role.ADMIN, Role.MANAGER]),
      checkDepartmentMiddleware,
      validationMiddleware(DeleteUserRequest),
      this.userController.deleteUser
    );
  }
}
export default UserRouter.create().getRouter();
