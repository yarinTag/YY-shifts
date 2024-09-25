import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
export * from 'class-validator';

export const validationPipe = async (
  schema: new () => object,
  requestObject: object
) => {
  const transformedClass: object = plainToInstance(schema, requestObject);
  const errors = await validate(transformedClass);
  if (errors.length > 0) {
    return { success: false, errors: errors };
  }
  return {
    sucsses: true,
  };
};
