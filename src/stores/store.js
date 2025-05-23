import { defineStore, acceptHMRUpdate } from 'pinia'

export const useStore = defineStore('store', {
  state: () => ({
    notes: [
      {
        id: 1,
        title: 'Testnotiz',
        content: 'Test C:',
        tags: ['Testnotizen'],
      },
      {
        id: 2,
        title: 'Testnotiz 2',
        content: 'Test 2 C:',
        tags: ['Testnotizen'],
      },
      {
        id: 3,
        title: 'Testnotiz 3',
        content: 'Test 3 C:',
        tags: ['Testnotizen'],
      },
      {
        id: 4,
        title: 'Testnotiz 4',
        content: 'Test 4 C:',
        tags: ['Testnotizen'],
      },
    ],
    // Logged-in user's data
    user: {
      id: 1,
      name: 'ptheiss',
      email: 'philipp.theiss@aisys-media.de',
      password: '123456',
    },
    // Settings, linked with associative table usersettings to user profiles
    settings: [
      {
        id: 1,
        user_id: 1, // user.id
        label: 'Dark mode',
        description: 'Enable dark mode?',
        value: '0',
      },
    ],
  }),

  getters: {
    getNotes: (state) => state.notes,
    getUser: (state) => state.user,
    getSettings: (state) => state.settings,
  },

  actions: {
    // Create
    newUser() {
      console.log('newUser')
    },
    newNotes() {
      console.log('newNotes')
    },
    newSettings() {
      console.log('newSettings')
    },
    // Read
    loadUser() {
      console.log('loadUser')
    },
    loadNotes() {
      console.log('loadNotes')
    },
    loadSettings() {
      console.log('loadSettings')
    },
    // Update
    saveUser() {
      console.log('saveUser')
    },
    saveNotes() {
      console.log('saveNotes')
    },
    saveSettings() {
      console.log('saveSettings')
    },
    // Delete
    deleteUser() {
      console.log('deleteUser')
    },
    deleteNotes() {
      console.log('deleteNotes')
    },
    deleteSettings() {
      console.log('deleteSettings')
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStore, import.meta.hot))
}
