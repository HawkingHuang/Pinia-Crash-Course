<template>
  <form @submit.prevent="handleSubmit">
    <input 
      type="text" 
      placeholder="I need to..."
      v-model="newTask"
    >
    <button>Add</button>
  </form>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useTaskStore } from '../stores/TaskStore'

const taskStore = useTaskStore()

const newTask = ref('')
const newTaskId = ref(null)
watch(() => taskStore.tasks, (newTasks) => {
  console.log(newTasks)
  newTaskId.value = taskStore.nextId
  console.log(newTaskId.value)
})

const handleSubmit = () => {
  if(newTask.value) {
    taskStore.addTask({
      id: newTaskId.value,
      title: newTask.value,
      isFav: false,
    })
    newTask.value = ''
  }
}
</script>