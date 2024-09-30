import { DataSource } from 'typeorm';

import { Department } from './department.schema';
import { BaseRepository } from '../BaseRepository';

export class DepartmentRepository extends BaseRepository<Department> {
  constructor(dataSource: DataSource) {
    super(Department, dataSource);
  }
}
