import { defineStore, acceptHMRUpdate } from 'pinia'
import { api } from 'src/boot/axios'
import { useQuasar } from 'quasar'

export const useTagsStore = defineStore('tags', {
  state: () => ({
    tags: [],
  }),

  getters: {
    getTags: (state) => state.tags,
  },

  actions: {
    // Create
    async newTag(data) {
      return api
        .post('/tags/', data)
        .then((response) => {
          this.state.tags.push(response.data)
        })
        .catch(() => {
          useQuasar.notify({
            color: 'negative',
            position: 'bottom',
            message: 'newFavourite Fehler!',
            icon: 'report_problem',
          })
        })
    },

    // Read
    async loadTags() {
      return api
        .get('/tags/')
        .then((response) => {
          this.state.tags.push(response.data)
        })
        .catch(() => {
          useQuasar.notify({
            color: 'negative',
            position: 'bottom',
            message: 'loadFavourites Fehler!',
            icon: 'report_problem',
          })
        })
    },
    // Update
    async updateTag(tag) {
      console.log('saveTag', tag)
    },
    // Delete
    async deleteTag(tag_id) {
      const data = {
        tag_id: tag_id,
      }
      return api
        .delete('/favourites/', data)
        .then(this.loadFavourites())
        .catch(() => {
          useQuasar.notify({
            color: 'negative',
            position: 'bottom',
            message: 'deleteFavourite Fehler!',
            icon: 'report_problem',
          })
        })
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTagsStore, import.meta.hot))
}
