import { defineStore, acceptHMRUpdate } from 'pinia'
import { api } from 'src/boot/axios'
import { useQuasar } from 'quasar'

export const useUsersStore = defineStore('usersStore', {
  state: () => ({
    // Logged-in user's data
    user: {
      id: 1,
      name: 'ptheiss',
      email: 'philipp.theiss@aisys-media.de',
      password: '123456',
      groups: {},
      favourites: [],
    },
    // tag-related properties
    selected: [],
    recent: [],
    tab: 'tags',
  }),

  getters: {
    getUser: (state) => state.user,
    getList: (state) => state.usersList,
    getFavourites: (state) => state.favourites,
    getRecent: (state) => state.recent,
    getGroups: (state) => state.recent,
  },

  actions: {
    // Create
    async newUser() {},
    async newFavourite(tag_id) {
      const data = {
        user_id: this.getUser.id,
        tag_id: tag_id,
      }
      return api
        .post('/favourites/', data)
        .then((response) => {
          this.favourites.push(response.data)
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
    async newRecent() {},
    // Read
    async loadUser() {},
    async loadFavourites() {
      const data = {
        user_id: this.getUser.id,
      }

      return api
        .get('/favourites/', data)
        .then((response) => {
          this.state.favourites.push(response.data)
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
    async saveUser() {},
    // Delete
    async deleteUser() {},
    async deleteFavourite(tag_id) {
      const data = {
        user_id: this.getUser.id,
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
  import.meta.hot.accept(acceptHMRUpdate(useUsersStore, import.meta.hot))
}
