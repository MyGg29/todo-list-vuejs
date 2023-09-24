<script setup lang="ts">
import TodoItem from '../components/TodoItem.vue'
import TodoCreate from '../components/TodoCreate.vue'
import { onMounted, ref } from 'vue';
import ApiService, { type Todo } from '@/services/apiService';
import { store } from '@/store/store'

//const todos = ref([] as Todo[])
onMounted(async () => {
  store.todos = await ApiService.getAllTodos()
})
const getTasksDone = () => {
  return store.todos.reduce((acc, x) => {
    if(x.doneAtDate != null) {
      acc++
    }
    return acc
  }, 0)
}

const getTaskInProgress = () => {
  return store.todos.reduce((acc, x) => {
    if(x.doneAtDate == null) {
      acc++
    }
    return acc
  }, 0)
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
      <TodoCreate/>
      <TodoItem v-for="todo in store.todos" :key="todo.id" :todo="todo"/>
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
