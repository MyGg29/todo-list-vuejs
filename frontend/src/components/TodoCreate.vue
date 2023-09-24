<script setup lang="ts">
import { ref } from 'vue'
import ApiService from '../services/apiService'
import { store } from '@/store/store';
const title = ref("")
const content = ref("")

const handleSubmit = async () => {
  await ApiService.createTodo({
    title: title.value,
    task: content.value
  })
  open.value = false
  store.todos = await ApiService.getAllTodos()
}
const open = ref(false)
</script>
<template>
  <article @click="open = true" class="create-todo">
    Cliquer pour créer une tache
  </article>
  <div v-if="open" class="modal">
    <p>Créer un todo</p>
    <form class="create-form" @submit.prevent="handleSubmit">
      <label for="title">Titre</label>
      <input v-model="title" id="title" type="text"/>
      <label for="content">Contenu</label>
      <textarea v-model="content" id="content" >
      </textarea>

      <div class="form-buttons">
        <button @click="open = false">Fermer</button>
        <button type="submit">Sauvegarder</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.form-buttons {
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.create-form {
  display:flex;
  flex-direction: column;
}
.create-todo {
  display:flex;
  align-items: center;
  justify-content: center;
  cursor: pointer
}
article {
  min-width: 300px;
  border: 1px solid black
}
header {
  font-size: 1.5rem;
  font-family: 'Sana Sans Alt W00 Black';
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid grey;
  justify-content: space-between;
}

header > * {
  padding: 5px;
}
.header-info {
  display: flex;
  flex-direction: column;
}

.modal {
  position: fixed;
  z-index: 999;
  top: 20%;
  left: 50%;
  width: 300px;
  margin-left: -150px;
  border: 1px solid black;
  padding: 10px;
  background-color: white;
}
</style>

