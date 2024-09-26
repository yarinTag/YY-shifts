import * as bcrypt from 'bcrypt';

import { dataSource } from '../../db';
import { Gender, User } from './user.schema';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { env } from 'process';
import { Not } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { Department } from '../departments/department.schema';
import { validationEntity } from '../../middlewares/validate';

interface IUser {
  name: string;
  email: string;
  phone: string;
  gender: Gender.MALE;
  password: string;
}

interface IUpdateUser {
  id?: string;
  name?: string;
  email?: string;
  phone?: string;
  gender?: Gender;
}

export class UserService {
  private userRepository = dataSource.getRepository(User);

  async createUser(data: IUser) {
    const encrypthPassword = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(data.password, encrypthPassword);
    const user = this.userRepository.create({
      name: data.name,
      email: data.email,
      phone: data.phone,
      gender: data.gender,
      password: hashedPassword,
    });

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
        name: user.name,
        phone: user.phone,
        email: user.email,
        // role: user.role,
        createdAt: user.createdAt,
        gender: user.gender,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET ?? '', {
        expiresIn: '30d',
      });

      return token;
    }
  }

  async verifyToken(token: string) {
    if (!token) {
      throw new Error('Token not provided');
    }
    try {
      const verify = jwt.verify(token, process.env.JWT_SECRET ?? '');
      return verify;
    } catch (err) {
      throw new Error('Invalid token');
    }
  }

  async updateUserById(data: IUpdateUser,id: string) {
    const userRepository = dataSource.getRepository(User);
    const existingUser = await userRepository.findOneBy({
      id
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

    await userRepository.update({ id }, entity);
    return {
      sucsses: true,
      message: 'User updated successfully',
    };
  }

  async updateUser(data: IUpdateUser, token: string) {
    const user = jwt.verify(token, process.env.JWT_SECRET ?? '') as JwtPayload;
    if (!user || !user.id) {
      throw new Error('User not found');
    }
    return await this.updateUserById(data,user.id)
  }
}
