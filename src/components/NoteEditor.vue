<template>
  <q-dialog>
    <q-layout view="Lhh lpR fff" container class="bg-white text-dark">
      <q-toolbar>
        <q-toolbar-title>Editor</q-toolbar-title>

        <q-btn flat dense icon="close" v-close-popup />
      </q-toolbar>

      <q-input outlined square v-model="title" label="Title"> </q-input>

      <q-select
        outlined
        square
        v-model="selectedTags"
        use-input
        hide-selected
        fill-input
        multiple
        :options="tags"
        use-chips
        label="Tags"
      />
      <q-editor v-model="content"> </q-editor>

      <q-drawer
        bordered
        v-model="drawer"
        :width="200"
        :breakpoint="600"
        class="bg-grey-3 text-dark q-pa-sm"
      >
        <div v-for="n in 50" :key="n">Drawer {{ n }} / 50</div>
      </q-drawer>

      <q-toolbar>
        <q-space />
        <q-btn flat dense icon="save" label="save" v-close-popup @click="createNote" />
      </q-toolbar>
    </q-layout>
  </q-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { useNotesStore } from 'src/stores/notesStore'
import { useTagsStore } from 'src/stores/tagsStore'

// Stores
const notesStore = useNotesStore()
const tagsStore = useTagsStore()

// V-Models / Refs
const title = ref('')
const content = ref('')
const selectedTags = ref([])
const tags = tagsStore.getTags
const drawer = ref(false)

// Functions
function createNote() {
  const newNote = {
    title: this.title,
    content: this.content,
  }

  notesStore.newNote(newNote)
}
</script>
