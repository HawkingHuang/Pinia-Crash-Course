import { defineStore } from 'pinia'

export const useTaskStore = defineStore('taskStore', {
 state: () => ({
  tasks: [],
  loading: false
 }),
 getters: {
  nextId: (state) => {
    console.log(...state.tasks.map(task => task.id))
    return Math.max(...state.tasks.map(task => task.id)) + 1
  },
  favs: (state) => {
    return state.tasks.filter(task => task.isFav)
  },
  favCount: (state) => {
    return state.favs.length
  },
  totalCount: (state) => {
    return state.tasks.length
  }
 },
 actions: {
  async getTasks () {
    this.loading = true
    const res = await fetch('http://localhost:3000/tasks')
    const data = await res.json()

    this.tasks = data
    this.loading = false
  },
  async addTask (task) {
    this.tasks = [...this.tasks, task]
    this.nextId
    
    const res = await fetch('http://localhost:3000/tasks', {
      method: 'POST',
      body: JSON.stringify(task),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if(res.error) {
      console.log(res.error)
    }
  },
  async deleteTask (id) {
    const taskToDeleteIndex = this.tasks.findIndex(task => task.id === id)
    this.tasks.splice(taskToDeleteIndex, 1)

    const res = await fetch(`http://localhost:3000/tasks/${id}`, {
      method: 'DELETE'
    })

    if(res.error) {
      console.log(res.error)
    }
  },
  async toggleFav (id) {
    const task = this.tasks.find(task => task.id === id)
    task.isFav = !task.isFav

    const res = await fetch(`http://localhost:3000/tasks/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({isFav: task.isFav}),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if(res.error) {
      console.log(res.error)
    }
  }
 }
})