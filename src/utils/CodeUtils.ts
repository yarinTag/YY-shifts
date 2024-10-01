import { ValidationResponse } from '../types/response/ValidationResponse';

export function flattenErrors(errorObject: ValidationResponse) {
  return errorObject.errors.map((error) => {
    return {
      property: error.property,
      constraints: error.constraints,
    };
  });
}
