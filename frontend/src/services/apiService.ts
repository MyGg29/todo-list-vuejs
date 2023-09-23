import axios from "axios"

export interface Todo {
  id: number
  title: string
  task: string
  creationDate: Date
  doneAtDate: Date
}
export interface TodoCreation {
  title: string
  task: string
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
  static async getAllTodos(): Promise<Todo[]> {
    const res = await axios.get("/")
    return res.data
  }
}