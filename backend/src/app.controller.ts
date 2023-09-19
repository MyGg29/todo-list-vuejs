import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './types/todo.type';

@Controller()
export class AppController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async getTodos(): Promise<string> {
    return this.todoService.getAllTodos();
  }
  @Post()
  async createTodo(@Body() body: Todo): Promise<string> {
    return this.todoService.createTodo(body)
  }
  @Delete(":id")
  async deleteTodo(@Param("id") id: string): Promise<string> {
    return this.todoService.deleteTodo(id)
  }
  @Put(":id")
  async updateTodo(@Param("id") id: string, @Body() body: Todo): Promise<string> {
    return this.todoService.updateTodo(id, body)
  }
}
