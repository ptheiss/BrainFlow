import { defineStore, acceptHMRUpdate } from 'pinia'

export const useSettingsStore = defineStore('settings', {
  state: () => ({
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
    getSettings: (state) => state.settings,
  },

  actions: {
    // Create
    newSettings() {
      console.log('newSettings')
    },
    // Read
    loadSettings() {
      console.log('loadSettings')
    },
    // Update
    saveSettings() {
      console.log('saveSettings')
    },
    // Delete
    deleteSettings() {
      console.log('deleteSettings')
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSettingsStore, import.meta.hot))
}
