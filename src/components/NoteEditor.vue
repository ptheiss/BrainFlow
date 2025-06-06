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
        v-model="tags"
        use-input
        hide-selected
        fill-input
        multiple
        :options="allTags"
        use-chips
        label="Tags"
      />
      <q-editor v-model="content"> </q-editor>

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

const props = defineProps(['title', 'content', 'tags'])

// Stores
const notesStore = useNotesStore()
const tagsStore = useTagsStore()

// V-Models / Refs
const title = ref(props.title)
const content = ref(props.content)
const tags = ref(props.tags)
const allTags = tagsStore.getTags

// Functions
function createNote() {
  const newNote = {
    title: props.title,
    content: props.content,
    tags: props.tags,
    group: props.group,
  }

  notesStore.newNote(newNote)
}
</script>
