import { ValidationError } from 'class-validator';

export function flattenErrors(errorObject: ValidationError[]) {
  return errorObject.map((error) => {
    return {
      property: error.property,
      constraints: error.constraints,
    };
  });
}
