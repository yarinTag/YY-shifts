import { Router } from 'express';
import { createUser, getAllUsers } from '../controller/userController';

const router = Router();

router.get('/users', getAllUsers);
router.post('/users', createUser);
// router.get('/users/:id');

export default router;
