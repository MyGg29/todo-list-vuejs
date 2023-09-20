import { Body, Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './types/todo.type';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async getTodos(): Promise<Todo[]> {
    return this.todoService.getAllTodos();
  }
  @Post()
  async createTodo(@Body() body: Todo): Promise<string> {
    if(this.todoService.createTodo(body)){
      return
    } else {
      throw Error("Couldn't create todo")
    }
  }
  @Delete(":id")
  async deleteTodo(@Param("id") id: string, @Res() res: Response): Promise<void> {
    console.log("tes")
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
    return this.todoService.updateTodo(id, body) 
  }
}
