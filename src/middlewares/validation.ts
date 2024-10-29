import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
export * from 'class-validator';

export const validationPipe = async (
  schema: new () => object,
  requestObject: object
): Promise<ValidationResult> => {
  const transformedClass: object = plainToInstance(schema, requestObject);
  const errors = await validate(transformedClass);
  if (errors.length > 0) {
    return { success: false, errors: errors, transformedClass: {} };
  }
  return {
    success: true,
    transformedClass,
  };
};

export interface ValidationResult {
  success: boolean;
  errors?: ValidationError[];
  transformedClass: object;
}
