<template>
  <li :class="{ completed: task.completed }">
    {{ task.title }} — {{ task.category }} — {{ task.priority }}
    <button @click="$emit('toggle-completed', task.id)">
      {{ task.completed ? 'Вернуть' : 'Выполнено' }}
    </button>
    <button @click="$emit('delete-task', task.id)">Удалить</button>
  </li>
</template>

<script setup>
defineProps({ task: Object })
</script>

<style>
.completed {
  text-decoration: line-through;
  color: gray;
}
li {
  margin-bottom: 5px;
  display: flex;
  gap: 5px;
  align-items: center;
}
button {
  padding: 2px 5px;
  font-size: 12px;
}
</style>
