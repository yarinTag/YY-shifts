import { Request, Response, NextFunction } from 'express';
import { body, validationResult, CustomValidator } from 'express-validator';

import { dataSource } from './db';
import { IsNull, Not } from 'typeorm';
import { User } from './modules/users/user.schema';

const isUnique: (field: keyof User, excludeId?: string) => CustomValidator = (field, excludeId) => {
  return async (value: string) => {
    const userRepository = dataSource.getRepository(User);
    const existingUser = await userRepository.findOne({
      where: {
        [field]: value,
        ...(excludeId && { id: Not(excludeId) }),
        deletedAt: IsNull(),
      },
    });

    if (existingUser) {
      throw new Error(`${field} is already in use`);
    }
    return true;
  };
};

export const userValidationRules = (isUpdate = false) => {
  return [
    body('email')
      .isEmail().withMessage('Must be a valid email address')
      .custom(isUnique('email', isUpdate ? 'id' : undefined)),
    
    body('phone')
      .isMobilePhone('he-IL').withMessage('Must be a valid phone number')
      .custom(isUnique('phone', isUpdate ? 'id' : undefined)),

    body('name').notEmpty().withMessage('Name is required'),
    body('password', 'password does not Empty').not().isEmpty(),
    body('password', 'The minimum password length is 6 characters').isLength({min: 8}),

  ];
};

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
