import { Not } from 'typeorm';
import jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';

import { dataSource } from '../../db';
import { Role, User } from './user.schema';
import {
  BadRequestError,
  EntityNotFoundError,
  UnprocessableEntityError,
} from '../../middlewares/error/ApiError';
import { SignInRequest } from './dto/SignInRequest';
import { CreateUserRequest } from './dto/CreateRequest';
import { UpdateUserRequest } from './dto/UpdateRequest';
import { validationEntity } from '../../middlewares/validate';
import { GetByIdRequest } from './dto/GetByIdRequest';

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
      throw new UnprocessableEntityError(
        `User with name: ${data.name}, Failed to create: ${validationResult.errors}`
      );
    }
    return await this.userRepository.save(user);
  }

  async signIn(authCredentials: SignInRequest) {
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
      const token = jwt.sign(payload, `${process.env.JWT_SECRET}`, {
        expiresIn: `${process.env.TOKEN_EXPIR}`,
      });

      return token;
    }
  }

  async getAllUsers(id: string) {
    const users = await this.userRepository.find({
      where: { id: Not(id), active: true },
    });
    return users;
  }

  private async findUserByIdAndDepartment(id: string, departmentId: string) {
    const user = await this.userRepository.findOne({
      where: { id, active: true, department: { id: departmentId } },
    });
    return user;
  }

  async findUserById(data: GetByIdRequest) {
    let user: User | null;
    if (data.role === Role.Admin) {
      user = await this.userRepository.findOne({
        where: { id: data.userId, active: true },
        relations: ['department']
      });
    } else
      user = await this.findUserByIdAndDepartment(
        data.userId,
        data.departmentId ?? ''
      );

    if (!user) throw new EntityNotFoundError(User.name, data.userId);

    return user;
  }

  async updateUserById(data: UpdateUserRequest, id: string) {
    const existingUser = await this.userRepository.findOneBy({
      id,
    });

    if (!existingUser) {
      throw new EntityNotFoundError(User.name, id);
    }

    const entity = plainToInstance(User, { ...existingUser, ...data });
    const validationResult = await validationEntity(User, entity);

    if (validationResult.sucsses === false) {
      throw new UnprocessableEntityError(
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
      throw new BadRequestError('User Id not found');
    }
    return await this.updateUserById(data, userId);
  }

  async deleteUser(phone: string) {
    const user = await this.userRepository.findOne({ where: { phone } });

    if (!user) {
      throw new EntityNotFoundError(User.name, phone);
    }

    user.active = false;
    await this.userRepository.update({ phone }, user);

    return user;
  }
}
