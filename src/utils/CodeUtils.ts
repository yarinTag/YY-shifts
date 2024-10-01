import { ValidationResponse } from '../types/responses/ValidationResponse';

export function flattenErrors(errorObject: ValidationResponse) {
  return errorObject.errors.map((error) => {
    return {
      property: error.property,
      constraints: error.constraints,
    };
  });
}
