import { defineStore, acceptHMRUpdate } from 'pinia'

export const useEditorStore = defineStore('editor', {
  state: () => ({
    editor: {
      title: 'Testnotiz',
      content: 'Test C:',
      tags: [1],
    },
  }),

  getters: {
    getEditor: (state) => state.editor,
  },

  actions: {
    // Create
    newEditor() {
      console.log('newEditor')
    },
    // Read
    loadEditor() {
      console.log('loadEditor')
    },
    // Update
    saveEditor() {
      console.log('saveEditor')
    },
    // Delete
    deleteEditor() {
      console.log('deleteEditor')
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useEditorStore, import.meta.hot))
}
