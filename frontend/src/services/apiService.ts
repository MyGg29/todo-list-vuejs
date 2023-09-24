import { store } from "@/store/store"
import axios from "axios"

export interface Todo {
  id: number
  title: string
  task: string
  creationDate: Date
  doneAtDate: Date|null
}
export interface TodoCreation {
  title: string
  task: string
}
export interface TodoUpdate {
  title: string
  task: string
  doneAtDate: Date|null
}
export default class ApiService {
  static async createTodo(todo: TodoCreation): Promise<boolean> {
    const res = await axios.post("/", todo)
    if(res.status === 201) {
      return true
    } else {
      return false
    }

  }
  static async deleteTodo(id: number) {
    return await axios.delete("/" + id)
  }  
  static async getAllTodos(): Promise<Todo[]> {
    const res = await axios.get<Todo[]>("/")
    store.todos = this.parseDate(res.data)
    return store.todos
  }
  static async toggleTodoDone(todo: Todo, done: boolean) {
    let payload = {} as TodoUpdate
    if(done) {
      payload = {
        doneAtDate: new Date(),
        task: todo.task,
        title: todo.title
      }
    } else {
      payload = {
        doneAtDate: null,
        task: todo.task,
        title: todo.title
      }
    }
    await axios.put(`${todo.id}`, payload)
  }
  static parseDate(data: Todo[]): Todo[] {
    return data.map(x => {
      x.creationDate = new Date(x.creationDate)
      x.doneAtDate = x.doneAtDate ? new Date(x.doneAtDate) : null
      return x
    })
  }
}