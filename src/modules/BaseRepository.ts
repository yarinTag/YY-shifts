import {
  Repository,
  EntityTarget,
  DataSource,
  FindOptionsWhere,
} from 'typeorm';

export interface BaseEntityWithId {
  id: string;
  active: boolean;
}

export class BaseRepository<T extends BaseEntityWithId> extends Repository<T> {
  constructor(entity: EntityTarget<T>, dataSource: DataSource) {
    super(entity, dataSource.createEntityManager());
  }

  async findById(id: string): Promise<T | null> {
    const where: FindOptionsWhere<T> = { id } as FindOptionsWhere<T>;
    return this.findOne({ where });
  }

  async findActiveById(id: string, relations?: string[]): Promise<T | null> {
    const where: FindOptionsWhere<T> = {
      id,
      active: true,
    } as FindOptionsWhere<T>;
    return this.findOne({ where, relations });
  }

  async findAll(): Promise<T[]> {
    return this.find();
  }

  async deleteById(id: string): Promise<T | null> {
    const where: FindOptionsWhere<T> = { id } as FindOptionsWhere<T>;
    const entity = await this.findActiveById(id);
    if (!entity) return null;
    entity.active = false;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await this.update(where, entity as any);
    return entity;
  }
}
