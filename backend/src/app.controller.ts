import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo, TodoDeleteRequest } from './types/todo.type';

@Controller()
export class AppController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  getTodos(): string {
    return this.todoService.getAllTodos();
  }
  @Post()
  createTodo(@Body() body: Todo): string {
    return this.todoService.createTodo(body)
  }
  @Delete(":id")
  deleteTodo(@Param("id") id: string): string {
    return this.todoService.deleteTodo(id)
  }
  @Put(":id")
  updateTodo(@Param("id") id: string, @Body() body): string {
    return this.todoService.updateTodo(id, body)
  }
}
