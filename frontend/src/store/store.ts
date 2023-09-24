import type { Todo } from "@/services/apiService";
import ApiService from "@/services/apiService";
import { reactive } from "vue";

export const store = reactive({
  todos: [] as Todo[],
  async refreshTodos() {
    this.todos = await ApiService.getAllTodos()
  }
})