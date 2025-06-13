<template>
  <q-page class="flex flex-center">
    <q-card class="card">
      <q-input outlined v-model="username" label="Username" dense />
      <q-input outlined v-model="password" type="password" label="Password" dense />
      <q-btn class="button" to="notes" color="secondary" label="Login"></q-btn>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'

const username = ref('')
const password = ref('')
</script>

<style>
.card {
  padding: 20px;
}

.button {
  align-self: center;
}
</style>
