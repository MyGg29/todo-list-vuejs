<script setup lang="ts">
import TodoItem from '../components/TodoItem.vue'
import TodoCreate from '../components/TodoCreate.vue'
import { onMounted, ref } from 'vue';
import ApiService, { type Todo } from '@/services/apiService';

const todos = ref([] as Todo[])
onMounted(async () => {
  todos.value = await ApiService.getAllTodos()
})
const getTasksDone = () => {
  return todos.value.reduce((acc, x) => {
    if(x.doneAtDate != null) {
      acc++
    }
    return acc
  }, 0)
}

const getTaskInProgress = () => {
  return todos.value.reduce((acc, x) => {
    if(x.doneAtDate == null) {
      acc++
    }
    return acc
  }, 0)
}
const updateList = async () => {
  todos.value = await ApiService.getAllTodos()
}
</script>
<template>
  <div>
    <h1>
      Entretien Tech Vue full stack
    </h1>
    <section id="summary-todos" class="summary-section">
      <div>
        <div>
          Taches faites: <span>{{ getTasksDone() }}</span>
        </div>
        <div>
          Taches en cours: <span>{{ getTaskInProgress() }}</span>
        </div>
      </div>
    </section>
    <section id="todo-list" class="list-todo">
      <TodoCreate @created="updateList()" />
      <TodoItem v-for="todo in todos" :key="todo.id" :todo="todo"/>
    </section>
  </div>
</template>

<style>
.list-todo {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 50px;
}
.summary-section {
  display:flex;
  flex-direction: column;
  margin-bottom: 30px;
  padding: 10px 5px 10px 5px;
  background-color: #d6180b;
  color: white;
  font-size: 1rem;
}

</style>
