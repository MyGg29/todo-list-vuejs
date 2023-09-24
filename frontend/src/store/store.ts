import type { Todo } from "@/services/apiService";
import { reactive } from "vue";

export const store = reactive({
  todos: [] as Todo[],
})