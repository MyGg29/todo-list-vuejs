<script setup lang="ts">
import TodoItem from '../components/TodoItem.vue'
import TodoCreate from '../components/TodoCreate.vue'

const todos = [1,2,3,4]
</script>
<template>
  <div>
    <h1>
      Entretien Tech Vue full stack
    </h1>
    <section id="summary-todos" class="summary-section">
      <div>
        <div>
          Taches faites: <span>xx</span>
        </div>
        <div>
          Taches en cours: <span>xx</span>
        </div>
      </div>
    </section>
    <section id="todo-list" class="list-todo">
      <TodoCreate/>
      <TodoItem v-for="todo in todos" :key="todo" :index="todo"/>
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
