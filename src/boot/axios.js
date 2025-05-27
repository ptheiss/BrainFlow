import { defineBoot } from '#q-app/wrappers'
import axios from 'axios'

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Login/Auth API Service
export const authService = {
  name: 'auth',
}

// Notes API Service
export const noteService = {
  name: 'notes',
  create(data) {
    return api.post('/notes/', data)
  },
  get() {
    return api.get('/notes/')
  },
  update(data) {
    return api.put('/notes/${data.id}', data)
  },
  delete(data) {
    return api.delete('/notes/', data)
  },
}

// Tags API Service
export const tagService = {
  name: 'tags',
  create(data) {
    return api.post('/tags/', data)
  },
  get() {
    return api.get('/tags/')
  },
  update(data) {
    return api.put('/tags/${data.id}', data)
  },
  delete(data) {
    return api.delete('/tags/', data)
  },
}

// Settings API Service
export const settingService = {
  name: 'settings',
  create(data) {
    return api.post('/settings/', data)
  },
  get() {
    return api.get('/settings/')
  },
  update(data) {
    return api.put('/settings/${data.id}', data)
  },
  delete(data) {
    return api.delete('/settings/', data)
  },
}

export default defineBoot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
})

export { api }
