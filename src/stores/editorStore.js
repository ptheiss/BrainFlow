import { defineStore, acceptHMRUpdate } from 'pinia'

export const useEditorStore = defineStore('editor', {
  state: () => ({
    id: null,
    title: '',
    content: '',
    tags: [],
    group: '',
    shouldUpdate: 0,
  }),

  getters: {
    getId: (state) => state.id,
    getTitle: (state) => state.title,
    getContent: (state) => state.content,
    getTags: (state) => state.tags,
    getGroup: (state) => state.group,
    getUpdate: (state) => state.shouldUpdate,
  },

  actions: {
    edit(note) {
      this.id = note.id
      this.title = note.title
      this.content = note.content
      this.tags = note.tags
      this.group = note.group
      this.shouldUpdate++
      return true
    },
    new() {
      this.id = null
      this.title = ''
      this.content = ''
      this.tags = []
      this.group = ''
      this.shouldUpdate++
      return true
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useEditorStore, import.meta.hot))
}
