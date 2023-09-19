import { Injectable } from '@nestjs/common';
import { Todo } from './types/todo.type';

@Injectable()
export class TodoService {
  getAllTodos(): string {
    throw new Error('Method not implemented.');
  }
  createTodo(body: Todo): string {
    throw new Error('Method not implemented.');
  }
  deleteTodo(id: string): string {
    throw new Error('Method not implemented.');
  }
  updateTodo(id: string, body: any): string {
    throw new Error('Method not implemented.');
  }
}
