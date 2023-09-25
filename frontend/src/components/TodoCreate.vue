<script setup lang="ts">
import { ref } from 'vue'
import ApiService from '../services/apiService'
import { store } from '@/store/store';
import type { Delta } from '@vueup/vue-quill'
const title = ref("")
const content = ref("")
const resetForm = () => {
  title.value = ""
  content.value = ""
}

const handleSubmit = async () => {
  console.log(content.value)
  await ApiService.createTodo({
    title: title.value,
    task: content.value
  })
  open.value = false
  store.refreshTodos()
  resetForm()
}
const open = ref(false)
</script>
<template>
  <article @click="open = true" class="create-todo">
    Cliquer pour créer une tâche
  </article>
  <div v-if="open" class="modal">
    <div class="modal-content">
      <p>Créer un todo</p>
      <form class="create-form" @submit.prevent="handleSubmit">
        <label for="title">Titre</label>
        <input v-model="title" id="title" type="text"/>
        <label for="content">Contenu</label>
        <quill-editor v-model:content="content" 
          contentType="html"
          theme="snow">
        </quill-editor>
        <div class="form-buttons">
          <button @click="open = false">Fermer</button>
          <button type="submit">Sauvegarder</button>
        </div>
      </form>

    </div>
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
  flex-grow: 1;
}
.create-todo {
  display:flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  min-height: 5rem;
}
article {
  border: 1px dashed black;
  border-radius: 0.4rem;
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
  width: 30rem;
  margin-left: -15rem;
  height: 30rem;
  border: 1px solid black;
  border-radius: 0.4rem;
  padding: 10px;
  background-color: white;
}
.modal-content {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>

