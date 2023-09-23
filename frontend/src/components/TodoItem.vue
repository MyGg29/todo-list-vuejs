<script setup lang="ts">
defineProps({
  index: Number
})
</script>
<template>
  <article>
    <header>
      <div>
        title {{ index }}
      </div>
      <div class="header-info">
        <div>
          date creation
        </div>
        <div>
          <input :id="'done-checkbox-' + index" type="checkbox"> 
          <label :for="'done-checkbox-' + index">done</label>
        </div>

      </div>
    </header>
    <div>
      content...
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

