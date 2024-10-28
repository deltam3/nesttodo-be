import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Profile } from '../typeorm/Profile';
import { User } from '../typeorm/User';
import { Todo } from '../typeorm/Todo';
import {
  CreateUserParams,
  CreateUserTodoParams,
  CreateUserProfileParams,
  UpdateUserParams,
} from '../utils/types';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
    @InjectRepository(Todo) private todoRepository: Repository<Todo>,
  ) {}

  findUsers() {
    return this.userRepository.find({ relations: ['profile', 'todos'] });
  }

  createUser(userDetails: CreateUserParams) {
    const newUser = this.userRepository.create({
      ...userDetails,
      createdAt: new Date(),
    });
    return this.userRepository.save(newUser);
  }

  updateUser(id: number, updateUserDetails: UpdateUserParams) {
    return this.userRepository.update({ id }, { ...updateUserDetails });
  }

  deleteUser(id: number) {
    return this.userRepository.delete({ id });
  }

  async createUserProfile(
    id: number,
    createUserProfileDetails: CreateUserProfileParams,
  ) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user)
      throw new HttpException(
        '유저가 발견되지 않아 프로필 생성할 수 없다.',
        HttpStatus.BAD_REQUEST,
      );
    const newProfile = this.profileRepository.create(createUserProfileDetails);
    const savedProfile = await this.profileRepository.save(newProfile);
    user.profile = savedProfile;
    return this.userRepository.save(user);
  }

  async createUserTodo(
    id: number,
    createUserTodoDetails: CreateUserTodoParams,
  ) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user)
      throw new HttpException(
        '유저가 발견되지 않아 프로필 생성할 수 없다.',
        HttpStatus.BAD_REQUEST,
      );
    const newTodo = this.todoRepository.create({
      ...createUserTodoDetails,
      user,
    });
    return this.todoRepository.save(newTodo);
  }
}
