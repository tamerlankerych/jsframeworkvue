<template>
  <form @submit.prevent="submitTask" class="task-form">
    <input v-model="title" placeholder="Название задачи" required />
    <select v-model="category">
      <option>Работа</option>
      <option>Учёба</option>
      <option>Дом</option>
    </select>
    <select v-model="priority">
      <option>Низкий</option>
      <option>Средний</option>
      <option>Высокий</option>
    </select>
    <button type="submit">Добавить</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { nanoid } from 'nanoid'

const title = ref('')
const category = ref('Работа')
const priority = ref('Средний')
const emit = defineEmits(['add-task'])

function submitTask() {
  emit('add-task', {
    id: nanoid(),
    title: title.value,
    category: category.value,
    priority: priority.value,
    completed: false
  })
  title.value = ''
}
</script>

<style>
.task-form {
  display: flex;
  gap: 5px;
  margin-bottom: 10px;
}
</style>
