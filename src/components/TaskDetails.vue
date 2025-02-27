<template>
  <div class="task">
    <h3>{{ task.title }}</h3>
    <div class="icons">
      <i @click="deleteTask(task.id)" class="material-icons">delete</i>
      <i @click="toggleFav(task.id)" class="material-icons" :class="{active: task.isFav}">favorite</i>
    </div>
  </div>
</template>

<script setup>
import { useTaskStore } from '../stores/TaskStore'

defineProps(['task'])

const taskStore = useTaskStore()

const deleteTask = (id) => {
  taskStore.deleteTask(id)
}

const toggleFav = (id) => {
  taskStore.toggleFav(id)
}
</script>