<template>
  <div>
    <p v-if="tasks.length === 0">Нет задач</p>
    <ul>
      <TaskItem 
        v-for="task in tasks" 
        :key="task.id" 
        :task="task" 
        @delete-task="$emit('delete-task', $event)" 
        @toggle-completed="$emit('toggle-completed', $event)"
      />
    </ul>
  </div>
</template>

<script setup>
import TaskItem from './TaskItem.vue'
defineProps({ tasks: Array })
</script>

<style>
ul {
  list-style: none;
  padding-left: 0;
}
</style>
