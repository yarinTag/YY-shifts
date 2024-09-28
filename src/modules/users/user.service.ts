import { Not } from 'typeorm';
import jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';

import { dataSource } from '../../db';
import { Gender, User } from './user.schema';
import { CreateUserRequest } from './dto/CreateRequest';
import { validationEntity } from '../../middlewares/validate';
import { UpdateUserRequest } from './dto/UpdateRequest';

export class UserService {
  private userRepository = dataSource.getRepository(User);

  async createUser(data: CreateUserRequest) {
    const encrypthPassword = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(data.password, encrypthPassword);

    const user = this.userRepository.create({
      name: data.name,
      email: data.email,
      phone: data.phone,
      gender: data.gender,
      password: hashedPassword,
    });
    const entity = plainToInstance(User, user);
    const validationResult = await validationEntity(User, entity);

    if (validationResult.sucsses === false) {
      throw new Error(
        `User with name: ${data.name}, Failed to create: ${validationResult.errors}`
      );
    }
    return await this.userRepository.save(user);
  }

  async signIn(authCredentials: { phone: string; password: string }) {
    const { phone, password } = authCredentials;
    const user = await this.userRepository.findOne({
      where: { phone, active: true },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = {
        id: user.id,
        role: user.role,
        departmentId: user.department,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET ?? '', {
        expiresIn: '30d',
      });

      return token;
    }
  }

  async getAllUsers(id: string) {
    try {
      const users = await this.userRepository.find({ where: { id: Not(id) } });
      return users;
    } catch (error) {
      throw new Error('Error fetching users');
    }
  }

  async updateUserById(data: UpdateUserRequest, id: string) {
    const existingUser = await this.userRepository.findOneBy({
      id,
    });

    if (!existingUser) {
      throw new Error('User not found');
    }

    const entity = plainToInstance(User, { ...existingUser, ...data });
    const validationResult = await validationEntity(User, entity);

    if (validationResult.sucsses === false) {
      throw new Error(
        `User with Id: ${id}, Failed to update: ${validationResult.errors}`
      );
    }

    await this.userRepository.update({ id }, entity);
    return {
      sucsses: true,
      message: 'User updated successfully',
    };
  }

  async updateUser(data: UpdateUserRequest, userId: string | undefined) {
    if (!userId) {
      throw new Error('User not found');
    }
    return await this.updateUserById(data, userId);
  }

  async deleteUser(phone: string) {
    const user = await this.userRepository.findOne({ where: { phone } });

    if (!user) {
      throw new Error('User not found');
    }

    user.active = false;
    await this.userRepository.update({ phone }, user);

    return user;
  }
}
