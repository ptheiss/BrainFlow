import { defineStore, acceptHMRUpdate } from 'pinia'

export const useUsersStore = defineStore('usersStore', {
  state: () => ({
    usersList: [],
    user: {
      // Logged-in user's data
      id: 1,
      name: 'ptheiss',
      email: 'philipp.theiss@aisys-media.de',
      password: '123456',
    },
  }),

  getters: {
    getUser: (state) => state.user,
    getUsername: (state) => state.user.name,
    getEmail: (state) => state.user.email,
    getList: (state) => state.usersList,
  },

  actions: {
    // Create
    newUser() {
      console.log('newUser')
    },
    // Read
    loadUser(id) {
      console.log('loadUser', id)
    },
    loadUsersList() {
      console.log('loadUsersList')
    },
    // Update
    saveUser(id) {
      console.log('saveUser', id)
    },
    // Delete
    deleteUser(id) {
      console.log('deleteUser', id)
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUsersStore, import.meta.hot))
}
