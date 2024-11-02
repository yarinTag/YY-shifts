import { validationPipe } from '../middlewares/validation';
import {UnprocessableEntityError} from "../middlewares/error/ApiError";

export const validationEntity = async (
  validationSchema: new () => object,
  entity: object
) => {
  const result = await validationPipe(validationSchema, entity);

  if (!result.success) {
    throw new UnprocessableEntityError(
        `Failed to create new ${validationSchema.name} : ${result.errors}`
    );  }

  return result;
};
