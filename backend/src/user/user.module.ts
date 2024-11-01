import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/User';
import { Profile } from 'src/typeorm/Profile';
import { Todo } from 'src/typeorm/Todo';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Profile, Todo])],
  controllers: [UsersController, UserController],
  providers: [UsersService, UserService],
})
export class UserModule {}
