import { NextFunction, Request, Response } from 'express';
import { validationPipe } from './validation';

export const validationMiddleware =
  (validationSchema: new () => object) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await validationPipe(validationSchema, {
      ...req.body,
      ...req.params,
    });

    if (!result.success) {
      return res.status(400).json(result);
    }

    next();
    return true;
  };
