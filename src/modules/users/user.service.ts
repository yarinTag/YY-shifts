import { Gender, User } from './user.schema';

import { dataSource } from '../../db';

interface IUser {
  name: string;
  email: string;
  phone: string;
  gender: Gender.MALE;
  password: string;
}

export class UserService {
  private userRepository = dataSource.getRepository(User);

  async createUser(data: IUser) {
    const user = this.userRepository.create({
      name: data.name,
      email: data.email,
      phone: data.phone,
      gender:data.gender,
      password: data.password,
    });

    return await this.userRepository.save(user);
  }
}
