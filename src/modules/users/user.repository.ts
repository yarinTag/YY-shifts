import { Not, UpdateResult } from 'typeorm';

import { User } from './user.schema';
import { BaseRepository } from '../BaseRepository';
import { IUserRepository } from './user.interface';
import { CreateUserRequest } from './dto/CreateRequest';

export class UserRepository implements IUserRepository {
  constructor(private repository: BaseRepository<User>) {}

  deleteUser(id: string): Promise<User | null> {
    return this.repository.deleteById(id);
  }
  update(entity: User): Promise<UpdateResult> {
    return this.repository.update({ id: entity.id }, entity);
  }
  findById(id: string): Promise<User | null> {
    return this.repository.findById(id);
  }
  findActiveById(id: string, relations: string[]): Promise<User | null> {
    return this.repository.findActiveById(id, relations);
  }
  save(user: User): Promise<User> {
    return this.repository.save(user);
  }
  create(req: CreateUserRequest): User {
    return this.repository.create(req);
  }

  async findByPhone(phone: string): Promise<User | null> {
    return this.repository.findOne({ where: { phone, active: true } });
  }

  async findByIdAndDepartment(id: string, departmentId: string) {
    return this.repository.findOne({
      where: { id, active: true, department: { id: departmentId } },
    });
  }

  async getAllUsersByDepartmentId(
    id: string,
    departmentId: string
  ): Promise<User[]> {
    return this.repository.find({
      where: { id: Not(id), active: true, departmentId },
    });
  }

  async getAllUsers(id: string): Promise<User[]> {
    return this.repository.find({
      where: { id: Not(id), active: true },
    });
  }
}
