import { defineStore, acceptHMRUpdate } from 'pinia'
import { api } from 'src/boot/axios'
import { Notify } from 'quasar'

export const useNotesStore = defineStore('notes', {
  state: () => ({
    notes: [],
  }),

  getters: {
    getNotes: (state) => state.notes,
  },

  actions: {
    async initialize() {
      await this.loadNotes()
    },
    // Create
    async newNote(data) {
      return api
        .post('/notes/', data)
        .then((response) => {
          this.notes = []

          console.log(response.data)
          for (let i = 0; i < response.data.length; i++) {
            this.notes.push(response.data[i])
          }
        })
        .catch(() => {
          Notify.create({
            color: 'negative',
            position: 'bottom',
            message: 'newNote Fehler!',
            icon: 'report_problem',
          })
        })
    },
    // Read
    async loadNotes() {
      return api
        .get('/notes/')
        .catch(() => {
          Notify.create({
            color: 'negative',
            position: 'bottom',
            message: 'loadNote Fehler!',
            icon: 'report_problem',
          })
        })
        .then((response) => {
          for (let i = 0; i < response.data.length; i++) {
            this.notes.push(response.data[i])
          }
        })
    },
    // Update
    async updateNote(data) {
      return api
        .put('/notes/', data)
        .then((response) => {
          this.state.tags.push(response.data)
        })
        .catch(() => {
          Notify.create({
            color: 'negative',
            position: 'bottom',
            message: 'newNote Fehler!',
            icon: 'report_problem',
          })
        })
    },
    // Delete
    async deleteNote(note_id) {
      const data = {
        note_id: note_id,
      }
      return api
        .delete('/notes/', data)
        .then(this.loadFavourites())
        .catch(() => {
          Notify.create({
            color: 'negative',
            position: 'bottom',
            message: 'deleteNote Fehler!',
            icon: 'report_problem',
          })
        })
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useNotesStore, import.meta.hot))
}
