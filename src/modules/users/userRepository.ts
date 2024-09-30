import { DataSource } from "typeorm";

import { User } from "./user.schema";
import { BaseRepository } from "../BaseRepository";

export class UserRepository extends BaseRepository<User> {
    constructor(dataSource: DataSource) {
      super(User, dataSource);
    }
  
    async findByEmail(email: string): Promise<User | null> {
      return this.findOne({ where: { email } });
    }
  }