import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/typeorm/User';
import { EditUserDto } from './dtos/';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async editUser(userId: number, dto: EditUserDto) {
    const user = await this.userRepository.findOneOrFail({
      where: { id: userId },
    });

    Object.assign(user, dto);

    const updatedUser = await this.userRepository.save(user);

    delete updatedUser.password;

    return updatedUser;
  }
}
