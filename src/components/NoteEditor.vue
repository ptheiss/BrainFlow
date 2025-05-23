<template>
  <q-dialog>
    <q-card>
      <q-toolbar>
        <q-toolbar-title>Editor</q-toolbar-title>

        <q-btn flat dense icon="close" v-close-popup />
      </q-toolbar>

      <q-input outlined square v-model="title" label="Title"> </q-input>
      <q-editor v-model="content"> </q-editor>

      <q-toolbar>
        <q-space />
        <q-btn flat dense icon="save" label="save" v-close-popup />
      </q-toolbar>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from 'vue'
const content = ref('')
</script>
