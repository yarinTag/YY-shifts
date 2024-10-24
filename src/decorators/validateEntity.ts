import { validationPipe } from '../middlewares/validation';
import { flattenErrors } from '../utils/CodeUtils';

export const validationEntity = async (
  validationSchema: new () => object,
  entity: object
) => {
  const result = await validationPipe(validationSchema, entity);

  if (result.success === false) {
    return { sucsses: false, errors: flattenErrors(result.errors) };
  }
  return result;
};
