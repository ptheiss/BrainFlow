import { defineStore, acceptHMRUpdate } from 'pinia'

export const useNotesStore = defineStore('notes', {
  state: () => ({
    notes: [
      {
        id: 1,
        title: 'Testnotiz',
        content: 'Test C:',
        tags: [1],
      },
      {
        id: 2,
        title: 'Testnotiz 2',
        content: 'Test 2 C:',
        tags: [1],
      },
      {
        id: 3,
        title: 'Testnotiz 3',
        content: 'Test 3 C:',
        tags: [1],
      },
      {
        id: 4,
        title: 'Testnotiz 4',
        content: 'Test 4 C:',
        tags: [1],
      },
    ],
  }),

  getters: {
    getNotes: (state) => state.notes,
  },

  actions: {
    // Create
    newNote() {
      console.log('newNote')
    },
    // Read
    loadAllNotes() {
      console.log('loadAllNotes')
    },
    loadNote(id) {
      console.log('loadNote', id)
    },
    // Update
    saveNote(id) {
      console.log('saveNote', id)
    },
    // Delete
    deleteNote(id) {
      console.log('deleteNote', id)
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useNotesStore, import.meta.hot))
}
