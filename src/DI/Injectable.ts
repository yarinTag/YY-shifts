import { Constructor, container } from './DIContainer';

export function Injectable(singleton = false): ClassDecorator {
  return (target) => {
    container.register(
      target.name,
      target as unknown as Constructor<unknown>,
      singleton
    );
  };
}
