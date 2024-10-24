import { NextFunction, Request, Response } from 'express';
import { ValidationError, validationPipe } from './validation';
import { ClientStatusCode } from '../types/enum/ClientStatusCode';
import { flattenErrors } from '../utils/CodeUtils';

export const validationMiddleware =
  (validationSchema: new () => object) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const requestData = Array.isArray(req.body) ? req.body : [req.body];

    const validationResults = await Promise.all(
      requestData.map((item) =>
        validationPipe(validationSchema, {
          ...item,
          ...req.params,
          ...req.query,
          ...req.headers,
        })
      )
    );

    const errors: ValidationError[] = validationResults
      .filter((result): result is { success: false; errors: ValidationError[] } => {
        return result.success === false && Array.isArray(result.errors);
      })
      .flatMap(result => result.errors);

    if (errors.length > 0) {
      return res
        .status(ClientStatusCode.BadRequest)
        .json(flattenErrors(errors));
    }

    next();
    return true;
  };
