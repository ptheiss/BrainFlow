import { defineStore, acceptHMRUpdate } from 'pinia'

export const useTagsStore = defineStore('tags', {
  state: () => ({
    tags: {
      1: {
        title: 'Testnotizen',
        color: '#a2aa33',
      },
    },
    recent: [
      {
        tag_id: 1,
        datetime: '2025-05-26T08:59:52+00:00',
      },
    ],
    favourites: [1],
    search: '',
    tab: 'tags',
  }),

  getters: {
    getTags: (state) => state.tags,
    getRecent: (state) => state.recent,
    getFavourites: (state) => state.favourites,
  },

  actions: {
    // Create
    newTag() {
      console.log('newTag')
    },
    newRecent() {
      console.log('newRecent')
    },
    newFavourite() {
      console.log('newFavourite')
    },
    newSearch() {
      console.log('newSearch')
    },
    // Read
    loadAllTags() {
      console.log('loadAllTags')
    },
    loadTag(id) {
      console.log('loadTag', id)
    },
    loadRecent(id) {
      console.log('loadRecent', id)
    },
    loadFavourites(id) {
      console.log('loadFavourites', id)
    },
    // Update
    saveTag(id) {
      console.log('saveTag', id)
    },
    // Delete
    deleteTag(id) {
      console.log('deleteTag', id)
    },
    deleteRecent(id) {
      console.log('deleteRecent', id)
    },
    deleteFavourite(id) {
      console.log('deleteTag', id)
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTagsStore, import.meta.hot))
}
