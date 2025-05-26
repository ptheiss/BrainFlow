<template>
  <q-page class="flex">
    <div class="div">
      <q-toolbar class="bg-grey-3 toolbar">
        <q-toolbar-title> Notes </q-toolbar-title>
        <q-btn flat dense icon="add" aria-label="New Note" @click="newNote" />
        <q-btn flat dense icon="refresh" aria-label="Refresh" />
      </q-toolbar>

      <q-list bordered separator class="noteList">
        <q-item v-for="note in notes" :key="note.id" clickable>
          <q-item-section>
            <q-item-label overline>{{ note.title }}</q-item-label>
            <q-item-label lines="1">{{ note.content }}</q-item-label>
            <q-item-label caption>{{ note.tags }}</q-item-label>
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

  <NoteEditor v-model="edit"></NoteEditor>
  <DeleteDialog v-model="del"></DeleteDialog>
</template>

<script setup>
import { ref } from 'vue'
import { useNotesStore } from 'src/stores/notesStore'
import NoteEditor from 'src/components/NoteEditor.vue'
import DeleteDialog from 'src/components/DeleteDialog.vue'

const notesStore = useNotesStore()

const notes = notesStore.getNotes
const edit = ref(false)
const del = ref(false)

function newNote() {
  console.log('newNote')
  edit.value = true
}

function editNote(id) {
  console.log('editNote: ', id)
  edit.value = true
}

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
