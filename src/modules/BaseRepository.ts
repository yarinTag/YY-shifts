/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Repository,
  EntityTarget,
  DataSource,
  FindOptionsWhere,
} from 'typeorm';

export interface BaseEntityWithId {
  id: string | object;
  active?: boolean;
}

type TKeys = 'id' | 'userId' | 'shiftId' | 'workCycleId' | 'active';
type BaseRequest = string | Partial<Record<TKeys, string>>;

export class BaseRepository<T extends BaseEntityWithId> extends Repository<T> {
  constructor(entity: EntityTarget<T>, dataSource: DataSource) {
    super(entity, dataSource.createEntityManager());
  }

  async findById(id: BaseRequest): Promise<T | null> {
    const where: FindOptionsWhere<T> = { id } as FindOptionsWhere<T>;
    return this.findOne({ where });
  }

  async findActiveById(
    id: BaseRequest,
    relations?: string[]
  ): Promise<T | null> {
    const where: FindOptionsWhere<T> = {
      id,
      active: true,
    } as FindOptionsWhere<T>;
    return this.findOne({ where, relations });
  }

  async findAll(): Promise<T[]> {
    return this.find();
  }

  async deleteById(id: BaseRequest): Promise<T | null> {
    const where: FindOptionsWhere<T> = { id } as FindOptionsWhere<T>;
    const entity = await this.findActiveById(id);
    if (!entity) return null;
    entity.active = false;

    await this.update(where, entity as any);
    return entity;
  }
}
