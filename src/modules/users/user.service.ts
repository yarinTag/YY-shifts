import * as bcrypt from 'bcrypt';

import { dataSource } from '../../db';
import { Gender, User } from './user.schema';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { env } from 'process';
import { Not } from 'typeorm';

interface IUser {
  name: string;
  email: string;
  phone: string;
  gender: Gender.MALE;
  password: string;
}

interface IUpdateUser {
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

  async updateUser(data: IUser, token: string) {
    const user = jwt.verify(token, process.env.JWT_SECRET ?? '') as JwtPayload;
    if (!user || !user.id) {
      throw new Error('User not found');
    }
    const userRepository = dataSource.getRepository(User);
    const existingUser = await userRepository.findOne({
      where: { id: user.id },
    });

    if (!existingUser) {
      throw new Error('User not found');
    }

    if (data.email) {
      const emailExists = await userRepository.findOne({
        where: { email: data.email, id: Not(user.id) },
      });
      if (emailExists) {
        throw new Error('Email is already in use by another user');
      }
    }

    if (data.phone) {
      const phoneExists = await userRepository.findOne({
        where: { phone: data.phone, id: Not(user.id) },
      });
      if (phoneExists) {
        throw new Error('Phone number is already in use by another user');
      }
    }

    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([_, v]) => v !== undefined)
    );
    Object.assign(existingUser, filteredData);
    await userRepository.save(existingUser);
    return existingUser;
  }
}
