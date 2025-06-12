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
        multiple
        :options="allTags"
        stack-label
        label="Tags"
      >
        <template v-slot:selected-item="scope">
          <q-chip
            removable
            @remove="scope.removeAtIndex(scope.index)"
            :tabindex="scope.tabindex"
            :color="scope.opt.color"
          >
            {{ scope.opt.label }}
          </q-chip>
        </template>
      </q-select>

      <q-editor v-model="content"> </q-editor>

      <q-toolbar>
        <q-space />
        <q-btn flat dense icon="save" label="save" v-close-popup @click="saveNote" />
      </q-toolbar>
    </q-layout>
  </q-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { useNotesStore } from 'src/stores/notesStore'
import { useEditorStore } from 'src/stores/editorStore'
import { useTagsStore } from 'src/stores/tagsStore'

// Stores
const notesStore = useNotesStore()
const editorStore = useEditorStore()
const tagsStore = useTagsStore()

// V-Models / Refs
const id = ref(editorStore.getId)
const title = ref(editorStore.getTitle)
const content = ref(editorStore.getContent)
const selectedTags = ref(editorStore.getTags)
const group = ref(editorStore.getGroup)
const allTags = tagsStore.getTags

// Functions
function saveNote() {
  const newNote = {
    title: title.value,
    content: content.value,
    tags: selectedTags.value,
    group: group.value,
  }

  if (id.value != null) {
    newNote.id = id.value
    notesStore.updateNote(newNote)
  } else {
    notesStore.newNote(newNote)
  }
}
</script>
