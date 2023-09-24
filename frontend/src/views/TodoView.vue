<script setup lang="ts">
import TodoItem from '../components/TodoItem.vue'
import TodoCreate from '../components/TodoCreate.vue'
import { onMounted, ref } from 'vue';
import ApiService, { type Todo } from '@/services/apiService';
import { store } from '@/store/store'

//const todos = ref([] as Todo[])
onMounted(async () => {
  store.refreshTodos()
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
  <div class="full-display">
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
    <div>
      <h1 class="category-title">todo en cours</h1>
      <section id="list-todo" class="list-todo">
        <TodoCreate/>
        <TodoItem v-for="todo in store.todos.filter(x => !x.doneAtDate)" :key="todo.id" :todo="todo"/>
      </section>
    </div>
    <div>
      <h1 class="category-title">todo fait</h1>
      <section id="done-todo" class="done-todo">
        <TodoItem v-for="todo in store.todos.filter(x => x.doneAtDate)" :key="todo.id" :todo="todo"/>
      </section>
    </div>
  </div>
</template>

<style>
.full-display {
  display: grid;
  grid-template-columns: 3fr 1fr;
}
.list-todo {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;
  padding-right: 1.5rem;
  border-right: 1px solid black;
}
.done-todo {
  display:flex;
  flex-direction: column;
  padding-left: 1.5rem;
  gap: 3rem;
}
.summary-section {
  display:flex;
  flex-direction: column;
  margin-bottom: 30px;
  padding: 10px 5px 10px 5px;
  background-color: #d6180b;
  border-radius: 0.4rem;
  color: white;
  font-size: 1rem;
  grid-column: 1/3;
}
.category-title {
  text-align: center;
  text-decoration: underline;
}

</style>
