<template>
  <q-page class="flex">
    <div class="div">
      <q-toolbar class="bg-grey-3 toolbar">
        <q-toolbar-title> Notes </q-toolbar-title>
        <q-btn flat dense icon="refresh" aria-label="Refresh" @click="refreshNotes" />
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
              <q-chip v-for="tag in note.tags" :key="tag.id" :color="tag.color" group="">
                {{ tag.title }}
              </q-chip>
            </q-item-label>
          </q-item-section>

          <q-item-section side>
            <div class="q-gutter-xs text-dark">
              <q-btn flat dense icon="content_copy" @click="copyToClipboard(note.content)" />
              <q-btn flat dense icon="edit" @click="editNote(note.id)" />
              <q-btn flat dense class="text-negative" icon="delete" @click="deleteNote(note.id)" />
            </div>
            <NoteEditor
              v-model="editExisting"
              :title="note.title"
              :content="note.content"
              :tags="note.tags"
            ></NoteEditor>
          </q-item-section>
        </q-item>
      </q-list>

      <q-page-sticky position="bottom-right" class="z-top" :offset="[18, 18]">
        <q-btn fab icon="add" color="primary" aria-label="New Note" @click="newNote" />
      </q-page-sticky>
    </div>
  </q-page>

  <NoteEditor v-model="editNew" title="" content="" tags="" group=""></NoteEditor>
  <DeleteDialog v-model="del"></DeleteDialog>
</template>

<script setup>
import { ref } from 'vue'
import { useNotesStore } from 'src/stores/notesStore'
import { copyToClipboard } from 'quasar'
import NoteEditor from 'src/components/NoteEditor.vue'
import DeleteDialog from 'src/components/DeleteDialog.vue'

// Stores
const notesStore = useNotesStore()

// V-Models / Refs
const notes = notesStore.getNotes
const del = ref(false)
const editNew = ref(false)
const editExisting = ref(false)
const group = ref([])
const groups = []

// Functions
function deleteNote(id) {
  console.log('deleteNote: ', id)
  del.value = true
}
async function refreshNotes() {
  await notesStore.loadNotes()
  console.log('refreshNotes')
}

function newNote() {
  console.log('newNote')
  editNew.value = true
}

function editNote(id) {
  const editorNote = notes.find((x) => x.id == id)

  if (editorNote != undefined) {
    console.log('editNote', editorNote)
    editExisting.value = true
  }
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
