import AsyncRouter from './customRouter';
import { validationMiddleware } from '../middlewares/validate';
import { CreateRequest } from '../modules/departments/dto/CreateRequest';
import { UpdateRequest } from '../modules/departments/dto/UpdateRequest';
import { DeleteRequest } from '../modules/departments/dto/DeleteRequest';
import { GetByIdRequest } from '../modules/departments/dto/GetByIdRequest';
import { DepartmentController } from '../modules/departments/department.controller';

const departmentController = new DepartmentController();
const departmentRouter = new AsyncRouter();

departmentRouter.get('/all', departmentController.getAllDepartments);
departmentRouter.get('/', departmentController.getDepartmentById);
departmentRouter.get(
  '/:id',
  validationMiddleware(GetByIdRequest),
  departmentController.getDepartmentById
);
departmentRouter.post(
  '/',
  validationMiddleware(CreateRequest),
  departmentController.createDepartment
);
departmentRouter.patch(
  '/:id',
  validationMiddleware(UpdateRequest),
  departmentController.patchDepartment
);
departmentRouter.delete(
  '/:id',
  validationMiddleware(DeleteRequest),
  departmentController.deleteDepartment
);

export default departmentRouter;
