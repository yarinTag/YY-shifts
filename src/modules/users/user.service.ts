import jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';

import { User } from './user.schema';
import {
  BadRequestError,
  EntityNotFoundError,
  UnprocessableEntityError,
} from '../../middlewares/error/ApiError';
import { Role } from '../../types/enum/Role';
import { IUserRepository, IUserService } from './user.interface';
import { SignInRequest } from './dto/SignInRequest';
import { GetByIdRequest } from './dto/GetByIdRequest';
import { CreateUserRequest } from './dto/CreateRequest';
import { UpdateUserRequest } from './dto/UpdateRequest';
import { validationEntity } from '../../decorators/validateEntity';

export class UserService implements IUserService {
  constructor(private userRepository: IUserRepository) {}

  async createUser(data: CreateUserRequest) {
    const encrypthPassword = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(data.password, encrypthPassword);

    const user = this.userRepository.create({
      ...data,
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
    const user = await this.userRepository.findByPhone(phone);

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = {
        id: user.id,
        role: user.role,
        departmentId: user.departmentId,
      };
      const token = jwt.sign(payload, `${process.env.JWT_SECRET}`, {
        expiresIn: `${process.env.TOKEN_EXPIR}`,
      });

      return token;
    }
  }

  async getAllUsers(id: string, departmentId?: string) {
    let users: User[] = [];

    if (departmentId) {
      users = await this.getUsersByDepartmentId(id, departmentId);
    } else users = await this.userRepository.getAllUsers(id);

    return users;
  }

  async getUsersByDepartmentId(id: string, departmentId: string) {
    const users = await this.userRepository.getAllUsersByDepartmentId(
      id,
      departmentId
    );
    return users;
  }

  async findUserByIdAndDepartment(id: string, departmentId: string) {
    const user = await this.userRepository.findByIdAndDepartment(
      id,
      departmentId
    );
    return user;
  }

  async findUserById(data: GetByIdRequest) {
    let user: User | null;
    if (data.role === Role.ADMIN) {
      user = await this.userRepository.findActiveById(data.userId, [
        'department',
      ]);
    } else
      user = await this.findUserByIdAndDepartment(
        data.userId,
        data.departmentId ?? ''
      );

    if (!user) throw new EntityNotFoundError(User.name, data.userId);

    return user;
  }

  async updateUserById(data: UpdateUserRequest, id: string) {
    const existingUser = await this.userRepository.findById(id);

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

    await this.userRepository.update(entity);
    return {
      success: true,
      message: 'User updated successfully',
    };
  }

  async updateUser(data: UpdateUserRequest, userId: string | undefined) {
    if (!userId) {
      throw new BadRequestError('User Id not found');
    }
    return await this.updateUserById(data, userId);
  }

  async deleteUser(id: string) {
    const user = await this.userRepository.deleteUser(id);

    if (!user) {
      throw new EntityNotFoundError(User.name, id);
    }

    return user;
  }
}
