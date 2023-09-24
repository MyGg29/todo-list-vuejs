<script setup lang="ts">
import { ref, type PropType, onMounted } from 'vue';
import ApiService, { type Todo } from '../services/apiService'
import { store } from '@/store/store';
import TrashBin from '@/components/icons/TrashBin.vue'
const props = defineProps({
  todo: Object as PropType<Todo>
})
const MAX_TASK_LENGTH = 300 // max number of letters that should be displayed
const done = ref(props.todo?.doneAtDate != null)
const showAll = ref(false)
const textTooBig = ref(false)
const quillOptions = {
  readOnly: true,
  modules: {
    toolbar: false
  }
}
onMounted(() => {
  textTooBig.value = (props.todo?.task?.length || 0) > MAX_TASK_LENGTH
})

const check = async (e:Event) => {
  if(props.todo) {
    await ApiService.toggleTodoDone(props.todo, done.value)
    store.refreshTodos()
  }
}
const deleteTodo = async (e: Event) => {
  if(props.todo) {
    await ApiService.deleteTodo(props.todo?.id)
    store.refreshTodos()
  }
}
const getShowableContent = (task:string|undefined) => {
  if(showAll.value) {
    return task
  } else {
    return task?.substring(0, 300)
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
        <div class="header-info-buttons">
          <div class="done-button">
            <input @change="check($event)" v-model="done" :id="'done-checkbox-' + todo?.id" type="checkbox"> 
            <label :for="'done-checkbox-' + todo?.id">Fait</label>
          </div>
          <div class="delete-button" @click="deleteTodo($event)">
            <TrashBin class="trash-icon"/>
            Supprimer 
          </div>
        </div>
      </div>
    </header>
    <div class="task-content">
      <quill-editor :content="getShowableContent(todo?.task)" contentType="html" readOnly="true" :options="quillOptions"></quill-editor>
      <div v-if="textTooBig" class="view-buttons">
        <button v-if="!showAll" class="flat" @click="showAll=true">Voir tout</button>
        <button v-if="showAll" class="flat" @click="showAll=false">Voir moins</button>
      </div>
    </div>
  </article>
</template>

<style scoped>
article {
  border: 1px solid black;
  border-radius: 0.4rem;
  background-color: white;
  padding: 0.4rem;
}
header {
  font-size: 1.5rem;
  font-family: 'Sana Sans Alt W00 Black';
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid grey;
  justify-content: space-between;
}

header > * {
  padding: 5px;
}
.header-info {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 0.75rem;
  font-style: italic;
}
.header-info-buttons {
  margin-left: 2rem;
  display: flex;
  flex-direction: column;
  align-items: end;
}
.delete-button {
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
}
.trash-icon {
  width: 1.5rem;
}
.done-button {
  cursor:pointer;
  display:flex;
  flex-direction: row;
  gap: 0.5rem;
}
.view-buttons {
  display:flex;
  margin-top:0.5rem;
  justify-content: end;
}
</style>

