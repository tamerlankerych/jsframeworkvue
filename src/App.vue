<template>
  <div class="app">
    <h1>Мой ToDo список</h1>
    
    <!-- Форма для добавления задач -->
    <TaskForm @add-task="addTask" />

    <!-- Фильтры -->
    <div class="filters">
      <label>
        Категория:
        <select v-model="selectedCategory">
          <option value="">Все</option>
          <option>Работа</option>
          <option>Учёба</option>
          <option>Дом</option>
        </select>
      </label>

      <label>
        Приоритет:
        <select v-model="selectedPriority">
          <option value="">Все</option>
          <option>Низкий</option>
          <option>Средний</option>
          <option>Высокий</option>
        </select>
      </label>

      <!-- новый фильтр -->
      <label>
        <input type="checkbox" v-model="onlyIncomplete" />
        Только невыполненные
      </label>
    </div>

    <!-- Список задач -->
    <TaskList
      :tasks="filteredTasks"
      @delete-task="deleteTask"
      @toggle-completed="toggleCompleted"
    />

    <!-- Количество невыполненных -->
    <p>Невыполненных задач: {{ incompleteCount }}</p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import TaskForm from './components/TaskForm.vue'
import TaskList from './components/TaskList.vue'

const tasks = ref([])

// фильтры
const selectedCategory = ref('')
const selectedPriority = ref('')
const onlyIncomplete = ref(false) //  новый фильтр

// добавить задачу
function addTask(task) {
  tasks.value.push(task)
}

// удалить задачу
function deleteTask(id) {
  tasks.value = tasks.value.filter(t => t.id !== id)
}

// отметить выполненной
function toggleCompleted(id) {
  const task = tasks.value.find(t => t.id === id)
  if (task) task.completed = !task.completed
}

// вычисляемые свойства
const incompleteCount = computed(() => tasks.value.filter(t => !t.completed).length)

const filteredTasks = computed(() => {
  return tasks.value.filter(t => {
    const categoryMatch = !selectedCategory.value || t.category === selectedCategory.value
    const priorityMatch = !selectedPriority.value || t.priority === selectedPriority.value
    const incompleteMatch = !onlyIncomplete.value || !t.completed
    return categoryMatch && priorityMatch && incompleteMatch
  })
})
</script>

<style>
.app {
  max-width: 600px;
  margin: auto;
  font-family: Arial, sans-serif;
}
.filters {
  margin: 10px 0;
  display: flex;
  gap: 10px;
  align-items: center;
}
</style>
