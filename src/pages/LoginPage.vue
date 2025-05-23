<template>
  <q-page class="flex flex-center">
    <q-card class="card">
      <q-input outlined v-model="text" label="Username" :dense="dense" />
      <q-input outlined v-model="text" label="Password" :dense="dense" />
      <q-btn class="button" to="notes" color="secondary" label="Login"></q-btn>
    </q-card>
  </q-page>
</template>

<script setup></script>

<style>
.card {
  padding: 20px;
}

.button {
  align-self: center;
}
</style>
