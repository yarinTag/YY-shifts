import { Router } from 'express';
import { DepartmentController } from '../modules/departments/department.controller';
import { validationMiddleware } from '../middlewares/validate';
import { CreateRequest } from '../modules/departments/dto/CreateRequest';
import { UpdateRequest } from '../modules/departments/dto/UpdateRequest';
import { GetByIdRequest } from '../modules/departments/dto/GetByIdRequest';

const departmentController = new DepartmentController();
const router = Router();
router.get('/', departmentController.getAllDepartments);
router.get(
  '/:id',
  validationMiddleware(GetByIdRequest),
  departmentController.getDepartmentById
);
router.post(
  '/',
  validationMiddleware(CreateRequest),
  departmentController.createDepartment
);
router.patch(
  '/:id',
  validationMiddleware(UpdateRequest),
  departmentController.patchDepartment
);

export default router;
