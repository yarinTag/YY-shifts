import { Department } from './department.schema';
import { BaseRepository } from '../BaseRepository';
import { IDepartmentRepository } from './department.interface';
import { UpdateResult } from 'typeorm';
import { CreateRequest } from './dto/CreateRequest';

export class DepartmentRepository implements IDepartmentRepository {
  constructor(private repository: BaseRepository<Department>) {}
  save(department: Department): Promise<Department> {
    return this.repository.save(department);
  }
  create(req: CreateRequest): Department {
    return this.repository.create(req);
  }
  findById(id: string): Promise<Department | null> {
    return this.repository.findById(id);
  }
  findActiveById(id: string, relations?: string[]): Promise<Department | null> {
    return this.repository.findActiveById(id, relations);
  }
  findAll(): Promise<Department[]> {
    return this.repository.findAll();
  }
  deleteById(id: string): Promise<Department | null> {
    return this.repository.deleteById(id);
  }
  update(entity: Department): Promise<UpdateResult> {
    return this.repository.update({ id: entity.id }, entity);
  }
}
