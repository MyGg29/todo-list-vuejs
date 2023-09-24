<script setup lang="ts">
import { ref, type PropType } from 'vue';
import ApiService, { type Todo } from '../services/apiService'
import { store } from '@/store/store';
import TrashBin from '@/components/icons/TrashBin.vue'
const props = defineProps({
  todo: Object as PropType<Todo>
})
const done = ref(props.todo?.doneAtDate != null)

const check = async (e:Event) => {
  if(props.todo) {
    await ApiService.toggleTodoDone(props.todo, done.value)
    store.todos = await ApiService.getAllTodos()
  }
}
const deleteTodo = async (e: Event) => {
  if(props.todo) {
    await ApiService.deleteTodo(props.todo?.id)
    store.todos = await ApiService.getAllTodos()
  }
}
</script>
<template>
  <article>
    <header>
      <div>
        {{ todo?.title }}
      </div>
      <div class="header-info">
        <div>
          Crée le : {{ todo?.creationDate?.toLocaleString() }}
        </div>
        <div>
          <input @change="check($event)" v-model="done" :id="'done-checkbox-' + todo?.id" type="checkbox"> 
          <label :for="'done-checkbox-' + todo?.id">Fait</label>
        </div>
        <div class="delete-button" @click="deleteTodo($event)">
          <TrashBin class="trash-icon"/>
          Supprimer 
        </div>

      </div>
    </header>
    <div>
      {{ todo?.task }}
    </div>
  </article>
</template>

<style scoped>
article {
  min-width: 350px;
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
  align-items: end;
  font-size: 0.75rem;
  font-style: italic;
}
.delete-button {
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
}
.trash-icon {
  width: 20px;
}
</style>

