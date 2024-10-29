// DI/dDIContainer.ts
import 'reflect-metadata';
import { readdirSync, statSync } from 'fs';
import { join } from 'path';

export type Constructor<T> = new (...args: unknown[]) => T;

interface Provider<T> {
  constructorFn: Constructor<T>;
  singleton: boolean;
}

class DIContainer {
  private registry = new Map<string, Provider<unknown>>();
  private singletons = new Map<string, unknown>();

  register<T>(
    key: string,
    constructorFn: Constructor<T>,
    singleton = false
  ): void {
    this.registry.set(key, { constructorFn, singleton });
  }

  resolve<T>(key: string): T {
    const target = this.registry.get(key);
    if (!target) throw new Error(`Dependency ${key} not found`);

    if (target.singleton && this.singletons.has(key)) {
      return this.singletons.get(key) as T;
    }

    const paramTypes =
      (Reflect.getMetadata(
        'design:paramtypes',
        target.constructorFn
      ) as Constructor<unknown>[]) || [];
    const params = paramTypes.map((paramType) => this.resolve(paramType.name));

    const instance = new target.constructorFn(...params);

    if (target.singleton) {
      this.singletons.set(key, instance);
    }

    return instance as T;
  }

  async autoRegister(directory: string): Promise<void> {
    const files = readdirSync(directory);
    const importPromises: Promise<void>[] = []; // Store import promises

    for (const file of files) {
      const filePath = join(directory, file);
      const stat = statSync(filePath);

      if (stat.isDirectory()) {
        // Recursively register from subdirectories
        await this.autoRegister(filePath);
      } else if (file.endsWith('.ts') || file.endsWith('.js')) {
        const importPromise = import(filePath)
          .then((module) => {
            const Class = module.default; // Assume default export
            console.log(`--- checking before Registering: ${Class.name} ---`); // Log the registered class
            // Check if the class is injectable
            if (Reflect.getMetadata('injectable', Class)) {
              console.log(`Registering: ${Class.name}`); // Log the registered class
              this.register(Class.name, Class);
            }
          })
          .catch((err) => console.error(`Failed to import ${filePath}:`, err));

        importPromises.push(importPromise); // Add promise to the array
      }
    }

    await Promise.all(importPromises); // Wait for all imports to complete
  }
}

export const container = new DIContainer();
