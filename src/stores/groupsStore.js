import { defineStore, acceptHMRUpdate } from 'pinia'
import { api } from 'src/boot/axios'
import { useQuasar } from 'quasar'

export const useGroupsStore = defineStore('groupsStore', {
  state: () => ({
    groups: {},
  }),

  getters: {
    getGroups: (state) => state.groups,
  },

  actions: {
    // Create
    async newGroup() {
      console.log('newGroup')
    },
    // Read
    async loadGroups() {
      const data = {
        user_id: this.getUser.id,
      }

      return api
        .get('/groups/', data)
        .then((response) => {
          this.state.favourites.push(response.data)
        })
        .catch(() => {
          useQuasar.notify({
            color: 'negative',
            position: 'bottom',
            message: 'loadGroups Fehler!',
            icon: 'report_problem',
          })
        })
    },
    // Update
    async saveGroup(id) {
      console.log('saveGroup', id)
    },
    // Delete
    async deleteGroup(user_id, group_id) {
      const data = {
        user_id: user_id,
        id: group_id,
      }
      return api
        .delete('/groups/', data)
        .then(this.loadGroups())
        .catch(() => {
          useQuasar.notify({
            color: 'negative',
            position: 'bottom',
            message: 'deleteGroups Fehler!',
            icon: 'report_problem',
          })
        })
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useGroupsStore, import.meta.hot))
}
