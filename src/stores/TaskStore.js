import { defineStore } from 'pinia'

export const useTaskStore = defineStore('taskStore', {
 state: () => ({
  tasks: [
    {id: 1, title: "buy some milk", isFav: false},
    {id: 2, title: "play Gloomhaven", isFav: true}
  ]
 }),
 getters: {
  favs: (state) => {
    return state.tasks.filter(task => task.isFav)
  },
  favCount: (state) => {
    return state.favs.length
  },
  totalCount: (state) => {
    return state.tasks.length
  }
 }
})