import { NextFunction, Request, Response } from 'express';
import { ValidationError, validationPipe } from './validation';

class ValidationResponse {
  success: boolean;
  errors: ValidationError[];
}

export const validationMiddleware =
  (validationSchema: new () => object) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await validationPipe(validationSchema, {
      ...req.body,
      ...req.params,
    });

    if (result.success === false) {
      return res.status(400).json(flattenErrors(result));
    }

    next();
    return true;
  };

function flattenErrors(errorObject: ValidationResponse) {
  return errorObject.errors.map((error) => {
    return {
      property: error.property,
      constraints: error.constraints,
    };
  });
}
