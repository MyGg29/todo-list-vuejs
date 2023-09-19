import { Injectable, OnModuleInit } from '@nestjs/common';
import { Todo } from './types/todo.type';
import { Client } from 'pg'

@Injectable()
export class TodoService implements OnModuleInit {
  db: Client
  constructor() {
    this.db = new Client({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD
    })
  }
  async onModuleInit() {
    await this.db.connect()
  }
  
  async getAllTodos(): Promise<string> {
    const selectQuery = `SELECT $1::text as message`
    const res = await this.db.query(selectQuery, ["Hello Worldd"])
    return res.rows[0].message
  }
  createTodo(body: Todo): string {
    throw new Error('Method not implemented.');
  }
  deleteTodo(id: string): string {
    throw new Error('Method not implemented.');
  }
  updateTodo(id: string, body: Todo): string {
    throw new Error('Method not implemented.');
  }
}
