import { NextFunction, Request, Response } from 'express';
import {
  ValidationError,
  validationPipe,
  ValidationResult,
} from './validation';
import { ClientStatusCode } from '../types/enum/ClientStatusCode';
import { flattenErrors } from '../utils/CodeUtils';

export const validationMiddleware =
  (validationSchema: new () => object) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const isArray = Array.isArray(req.body);
    const requestData: object[] = isArray ? req.body : [req.body];

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

    if (isFailed(validationResults)) {
      return res
        .status(ClientStatusCode.BadRequest)
        .json(flattenErrors(mapToValidationErrors(validationResults)));
    }

    req.body = mapToBody(isArray, validationResults);

    next();
    return true;
  };

function mapToValidationErrors(
  validationResults: ValidationResult[]
): ValidationError[] {
  return validationResults.reduce<ValidationError[]>((arr, current) => {
    if (current.success === false && Array.isArray(current.errors)) {
      return [...arr, ...current.errors];
    }

    return arr;
  }, []);
}

function mapToBody(
  isArray: boolean,
  validationResults: ValidationResult[]
): object | object[] {
  if (isArray) {
    return flatTransformClass(validationResults);
  }

  return validationResults[0].transformedClass;
}

function flatTransformClass(validationResults: ValidationResult[]): object[] {
  return validationResults.reduce<object[]>((arr, current) => {
    if (current.transformedClass) {
      arr.push(current.transformedClass);
    }

    return arr;
  }, []);
}

function isFailed(validationResults: ValidationResult[]): boolean {
  return (
    validationResults.filter((result) => result.success === false).length > 0
  );
}
