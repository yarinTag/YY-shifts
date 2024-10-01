import { DataSource, Not } from 'typeorm';

import { User } from './user.schema';
import { BaseRepository } from '../BaseRepository';

export class UserRepository extends BaseRepository<User> {
  constructor(dataSource: DataSource) {
    super(User, dataSource);
  }

  async findByPhone(phone: string): Promise<User | null> {
    return this.findOne({ where: { phone, active: true } });
  }

  async findByIdAndDepartment(id: string, departmentId: string) {
    return this.findOne({
      where: { id, active: true, department: { id: departmentId } },
    });
  }

  async getAllUsersByDepartmentId(
    id: string,
    departmentId: string
  ): Promise<User[]> {
    return this.find({
      where: { id: Not(id), active: true, departmentId },
    });
  }

  async getAllUsers(id: string): Promise<User[]> {
    return this.find({
      where: { id: Not(id), active: true },
    });
  }
}
