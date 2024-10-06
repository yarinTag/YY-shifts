import { NextFunction, Request, Response } from 'express';
import { validationPipe } from './validation';
import { ClientStatusCode } from '../types/enum/ClientStatusCode';
import { flattenErrors } from '../utils/CodeUtils';

export const validationMiddleware =
  (validationSchema: new () => object) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await validationPipe(validationSchema, {
      ...req.body,
      ...req.params,
      ...req.query,
      ...req.headers,
    });

    if (result.success === false) {
      return res
        .status(ClientStatusCode.BadRequest)
        .json(flattenErrors(result));
    }

    next();
    return true;
  };
