import { Router } from 'express';
import {
  createDepartment,
  getAllDepartments,
  getDepartmentById,
} from '../modules/departments/department.controller';
import { validationMiddleware } from '../middlewares/validate';
import { IsString, IsUUID, Length } from 'class-validator';

const router = Router();
router.get('/', getAllDepartments);

class CreateRequest {
  @IsString()
  @Length(1, 50)
  name: string;
  @IsString()
  address: string;
}

router.post('/', validationMiddleware(CreateRequest), createDepartment);

class getByIdRequest {
  @IsUUID()
  id: string;
}
router.get('/:id', validationMiddleware(getByIdRequest), getDepartmentById);

export default router;
