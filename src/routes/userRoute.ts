import { Router } from 'express';
import UserController from '../modules/users/user.controller';
import { userValidationRules, validate } from '../validationMiddleware';

const router = Router();

router.post('/sign-in', UserController.signIn);

router.get('/users', UserController.verifyToken,UserController.getAllUsers);
router.post('/users',userValidationRules(),validate, UserController.createUser);
// router.get('/users/:id');

export default router;
