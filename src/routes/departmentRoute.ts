import AsyncRouter from './AsyncRouter';
import { validationMiddleware } from '../middlewares/validate';
import { CreateRequest } from '../modules/departments/dto/CreateRequest';
import { UpdateRequest } from '../modules/departments/dto/UpdateRequest';
import { DeleteRequest } from '../modules/departments/dto/DeleteRequest';
import { GetByIdRequest } from '../modules/departments/dto/GetByIdRequest';
import { IDepartmentController } from '../modules/departments/department.interface';
import { RoleGuard } from '../middlewares/authMiddleware';
import { Role } from '../types/enum/Role';

export default class DepartmentRouter extends AsyncRouter {
  constructor(private departmentController: IDepartmentController) {
    super();
    this.initializeRoutes();
  }
  private initializeRoutes() {
    this.get(
      '/all',
      RoleGuard([Role.ADMIN]),
      this.departmentController.getAllDepartments
    );
    this.get('/', this.departmentController.getDepartmentById);
    this.get(
      '/:id',
      RoleGuard([Role.ADMIN]),
      validationMiddleware(GetByIdRequest),
      this.departmentController.getDepartmentById
    );
    this.post(
      '/',
      RoleGuard([Role.ADMIN]),
      validationMiddleware(CreateRequest),
      this.departmentController.createDepartment
    );
    this.patch(
      '/:id',
      RoleGuard([Role.ADMIN, Role.MANAGER]),
      validationMiddleware(UpdateRequest),
      this.departmentController.patchDepartment
    );
    this.delete(
      '/:id',
      RoleGuard([Role.ADMIN]),
      validationMiddleware(DeleteRequest),
      this.departmentController.deleteDepartment
    );
  }
}
