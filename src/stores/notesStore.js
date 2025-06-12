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
    async update() {
      await this.loadNotes()
    },
    // Create
    async newNote(data) {
      console.log('newNote', data)
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
      this.notes = []
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

          //console.log('loadNotes concluded ', this.notes)
        })
    },
    // Update
    async updateNote(data) {
      console.log('updateNote', data)
      return api
        .put('/notes/' + data.id + '/', data)
        .catch(() => {
          Notify.create({
            color: 'negative',
            position: 'bottom',
            message: 'updateNote Fehler!',
            icon: 'report_problem',
          })
        })
        .then(() => {
          this.update()
        })
    },
    // Delete
    async deleteNote(note_id) {
      const data = {
        note_id: note_id,
      }
      return api
        .delete('/notes/', data)
        .then(this.loadNotes())
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
