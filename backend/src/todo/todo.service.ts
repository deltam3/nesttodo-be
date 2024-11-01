import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from '../typeorm/Todo';
import { CreateTodoDto, EditTodoDto } from './dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}

  getTodos(userId: number) {
    return this.todoRepository.find({
      where: { userId },
    });
  }

  getTodoById(userId: number, todoId: number) {
    return this.todoRepository.findOne({
      where: { id: todoId, userId },
    });
  }

  async createTodo(userId: number, dto: CreateTodoDto) {
    const todo = this.todoRepository.create({
      userId,
      ...dto,
    });
    return this.todoRepository.save(todo);
  }

  async editTodoById(userId: number, todoId: number, dto: EditTodoDto) {
    const todo = await this.todoRepository.findOne({
      where: { id: todoId },
    });

    if (!todo || todo.userId !== userId) {
      throw new ForbiddenException('Access to resources denied');
    }

    Object.assign(todo, dto);
    return this.todoRepository.save(todo);
  }

  async deleteTodoById(userId: number, todoId: number) {
    const todo = await this.todoRepository.findOne({
      where: { id: todoId },
    });

    if (!todo || todo.userId !== userId) {
      throw new ForbiddenException('Access to resources denied');
    }

    await this.todoRepository.remove(todo);
  }
}
