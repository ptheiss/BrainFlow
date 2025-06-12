import { defineStore, acceptHMRUpdate } from 'pinia'
import { api } from 'src/boot/axios'
import { Notify } from 'quasar'

export const useTagsStore = defineStore('tags', {
  state: () => ({
    tags: [],
    shouldUpdate: 0,
  }),

  getters: {
    getTags: (state) => state.tags,
  },

  actions: {
    async update() {
      await this.loadTags()
      this.shouldUpdate++
    },
    // Create
    async newTag(data) {
      return api
        .post('/tags/', data)
        .then(() => {
          this.loadTags()
        })
        .catch(() => {
          Notify.create({
            color: 'negative',
            position: 'bottom',
            message: 'newFavourite Fehler!',
            icon: 'report_problem',
          })
        })
    },

    // Read
    async loadTags() {
      this.tags = []
      return api
        .get('/tags/')
        .then((response) => {
          for (let i = 0; i < response.data.length; i++) {
            this.tags.push(response.data[i])
          }
        })
        .catch(() => {
          Notify.create({
            color: 'negative',
            position: 'bottom',
            message: 'loadTags Fehler!',
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
          Notify.create({
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
