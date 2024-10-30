import { ValidationError } from 'class-validator';

export function flattenErrors(validationErrors: ValidationError[] | undefined) {
  if (validationErrors == undefined) return validationErrors;

  return validationErrors.map((error) => {
    return {
      property: error.property,
      constraints: error.constraints,
    };
  });
}

export const groupBy = <T, U>(
  items: Readonly<T[]>,
  fn: (item: T) => U
): Map<U, T[]> => {
  return items.reduce((map, item) => {
    const key = fn(item);
    // Initialize the array for this key if it doesn't exist, then push the item
    if (!map.has(key)) {
      map.set(key, []);
    }
    map.get(key)!.push(item);
    return map;
  }, new Map<U, T[]>());
};
