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
    newEditor() {},
    // Read
    loadEditor() {},
    // Update
    saveEditor() {},
    // Delete
    deleteEditor() {},
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useEditorStore, import.meta.hot))
}
