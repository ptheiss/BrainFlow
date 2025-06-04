<template>
  <q-page class="flex">
    <div class="div">
      <q-toolbar class="bg-grey-3 toolbar">
        <q-toolbar-title> Notes </q-toolbar-title>
        <q-btn flat dense icon="refresh" aria-label="Refresh" />
      </q-toolbar>

      <q-select
        outlined
        stack-label
        v-model="group"
        :options="groups"
        label="Filter content by group"
      />

      <q-list bordered separator class="noteList">
        <q-item v-for="note in notes" :key="note.id" clickable>
          <q-item-section>
            <q-item-label overline>{{ note.title }}</q-item-label>
            <q-item-label lines="1">{{ note.content }}</q-item-label>
            <q-item-label caption>
              <q-chip v-for="tag in note.tags" :key="tag.id" :color="tag.color">
                {{ tag.title }}
              </q-chip>
            </q-item-label>
          </q-item-section>

          <q-item-section side>
            <div class="q-gutter-xs text-dark">
              <q-btn flat dense icon="edit" @click="editNote(note.id)" />
              <q-btn flat dense class="text-negative" icon="delete" @click="deleteNote(note.id)" />
            </div>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-page>

  <DeleteDialog v-model="del"></DeleteDialog>
</template>

<script setup>
import { ref } from 'vue'
import { useNotesStore } from 'src/stores/notesStore'
import DeleteDialog from 'src/components/DeleteDialog.vue'

// Stores
const notesStore = useNotesStore()

// V-Models / Refs
const notes = notesStore.getNotes
const del = ref(false)
const group = ref([])
const groups = []

// Functions
function deleteNote(id) {
  console.log('deleteNote: ', id)
  del.value = true
}
</script>

<style>
.div {
  width: 100%;
  padding: 0;
}

.noteList {
  margin-top: 0;
  width: 100%;
}
</style>
