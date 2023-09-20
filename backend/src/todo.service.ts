import { Injectable, OnModuleInit } from '@nestjs/common';
import { Todo } from './types/todo.type';
import { Client } from 'pg'

@Injectable()
export class TodoService implements OnModuleInit {
  db: Client
  table: string
  constructor() {
    this.table = "todo";
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
  
  async getAllTodos(): Promise<Todo[]> {
    const selectQuery = `SELECT id, title, task, creationDate, doneAtDate FROM ${this.table}`
    const { rows } = await this.db.query(selectQuery)
    return rows
  }
  async getTodo(id: string): Promise<Todo> {
    const query = `SELECT id, title, task, creationDate, doneAtDate FROM ${this.table} WHERE id = $1`
    const { rows } = await this.db.query(query, [id])
    return rows[0]
  }
  async createTodo(body: Todo): Promise<boolean> {
    const query = `INSERT INTO ${this.table}(title, task, creationDate) VALUES ($1, $2, $3)`
    const values = [body.title, body.task, new Date()]
    const res = await this.db.query(query, values)
    return res.rowCount === 1
  }
  async deleteTodo(id: string): Promise<boolean> {
    const query = `DELETE FROM ${this.table} WHERE id=$1`
    const values = [id]
    const res = await this.db.query(query, values)
    console.log(res)
    return res.rowCount === 1
  }
  async updateTodo(id: string, body: Todo): Promise<Todo|null> {
    const query = `UPDATE ${this.table} SET title = $1, task = $2, doneAtDate = $3 WHERE id = $4`
    const values = [body.title, body.task, body.doneAtDate, id]
    const res = await this.db.query(query, values)
    if(res.rowCount === 1) {
      return this.getTodo(id)
    } else {
      return
    }
  }
}
