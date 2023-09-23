<script setup lang="ts">
import type { PropType } from 'vue';
import { type Todo } from '../services/apiService'
defineProps({
  todo: Object as PropType<Todo>
})
</script>
<template>
  <article>
    <header>
      <div>
        {{ todo?.title }}
      </div>
      <div class="header-info">
        <div>
          {{ todo?.creationDate }}
        </div>
        <div>
          <input :id="'done-checkbox-' + todo?.id" type="checkbox"> 
          <label :for="'done-checkbox-' + todo?.id">done</label>
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
}
</style>

