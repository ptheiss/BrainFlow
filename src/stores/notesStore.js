import { defineStore, acceptHMRUpdate } from 'pinia'
import { api } from 'src/boot/axios'
import { useQuasar } from 'quasar'

export const useNotesStore = defineStore('notes', {
  state: () => ({
    notes: [],
  }),

  getters: {
    getNotes: (state) => state.notes,
  },

  actions: {
    // Create
    async newNote(data) {
      return api
        .post('/notes/', data)
        .then((response) => {
          this.state.tags.push(response.data)
        })
        .catch(() => {
          useQuasar.notify({
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
        .then((response) => {
          this.state.tags.push(response.data)
        })
        .catch(() => {
          useQuasar.notify({
            color: 'negative',
            position: 'bottom',
            message: 'loadNote Fehler!',
            icon: 'report_problem',
          })
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
          useQuasar.notify({
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
          useQuasar.notify({
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
