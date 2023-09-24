import { BadRequestException, Body, Controller, Delete, Get, Logger, Param, Post, Put, Res } from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './types/todo.type';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async getTodos(): Promise<Todo[]> {
    Logger.debug("Listing todos")
    const todos = await this.todoService.getAllTodos()
    return todos.sort((a,b) => a.id - b.id);
  }
  @Get(":id")
  async getTodo(@Param("id") id): Promise<Todo> {
    Logger.debug("Getting todo" + id)
    return this.todoService.getTodo(id);
  }
  @Post()
  async createTodo(@Body() body: Todo): Promise<string> {
    Logger.debug("Creating todo")
    if(this.todoService.createTodo(body)){
      return
    } else {
      throw new BadRequestException("Couldn't create todo")
    }
  }
  @Delete(":id")
  async deleteTodo(@Param("id") id: string, @Res() res: Response): Promise<void> {
    Logger.debug("Deleting todo" + id)
    const ok = await this.todoService.deleteTodo(id)
    if(ok) {
      res.status(204).send()
      return 
    } else {
      res.status(404).send()
      return 
    }
  }
  @Put(":id")
  async updateTodo(@Param("id") id: string, @Body() body: Todo): Promise<Todo> {
    Logger.debug("Updating todo" + id)
    const todo = await this.todoService.updateTodo(id, body)
    if(todo) {
      return todo
    } else {
      throw new BadRequestException("Couldn't update todo")
    }
  }
}
