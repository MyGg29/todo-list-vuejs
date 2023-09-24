<script setup lang="ts">
import { ref, type PropType } from 'vue';
import ApiService, { type Todo } from '../services/apiService'
const props = defineProps({
  todo: Object as PropType<Todo>
})
const done = ref(props.todo?.doneAtDate != null)

const check = (e:Event) => {
  if(props.todo?.id) {
    ApiService.toggleTodoDone(props.todo, done.value)
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

      </div>
    </header>
    <div>
      {{ todo?.task }}
    </div>
  </article>
</template>

<style scoped>
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
  align-items: end;
  font-size: 0.75rem;
  font-style: italic;
}
</style>

