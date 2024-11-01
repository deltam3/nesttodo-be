import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { JwtStrategy } from 'src/auth/strategy';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/User';
import { Todo } from 'src/typeorm/Todo';

@Module({
  imports: [TypeOrmModule.forFeature([User, Todo]), JwtModule.register({})],
  controllers: [TodoController],
  providers: [TodoService, JwtStrategy],
})
export class TodoModule {}
