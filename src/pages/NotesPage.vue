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
        v-model="selectedGroup"
        :options="groups"
        label="Filter content by group"
      />

      <q-list v-for="(note, index) in notes" :key="index" bordered separator class="noteList">
        <q-item>
          <q-item-section>
            <q-item-label overline>{{ note.title }}</q-item-label>
            <q-item-label lines="1">{{ cleanHtml(note.content) }}</q-item-label>

            <q-item-label>
              <q-chip v-for="tag in note.tags" :key="tag.id" :color="tag.color" :group="group">
                {{ tag.label }}
              </q-chip>
            </q-item-label>
          </q-item-section>
          <q-item-section side>
            <div class="q-gutter-xs text-dark">
              <q-btn
                flat
                dense
                icon="content_copy"
                @click="copyToClipboard(cleanHtml(note.content))"
              />
              <q-btn flat dense icon="edit" @click="editNote(note.id)" />
              <q-btn flat dense class="text-negative" icon="delete" @click="deleteNote(note.id)" />
            </div>
          </q-item-section>
        </q-item>
      </q-list>

      <q-page-sticky position="bottom-right" class="z-top" :offset="[18, 18]">
        <q-btn fab icon="add" color="primary" aria-label="New Note" @click="newNote" />
      </q-page-sticky>
    </div>
  </q-page>

  <NoteEditor
    v-model="edit"
    title=""
    content=""
    tags=""
    group=""
    :key="editorStore.getUpdate"
  ></NoteEditor>
  <DeleteDialog v-model="del"></DeleteDialog>
</template>

<script setup>
import { ref } from 'vue'
import { useNotesStore } from 'src/stores/notesStore'
import { useEditorStore } from 'src/stores/editorStore'
import { copyToClipboard } from 'quasar'
import NoteEditor from 'src/components/NoteEditor.vue'
import DeleteDialog from 'src/components/DeleteDialog.vue'
import { useUsersStore } from 'src/stores/usersStore'

// Stores
const notesStore = useNotesStore()
const editorStore = useEditorStore()
const usersStore = useUsersStore()

// V-Models / Refs
const notes = ref(notesStore.getNotes)
const del = ref(false)
const edit = ref(false)
const group = ref([])
const selectedGroup = ref('')
const groups = usersStore.getGroups.value

// Functions
function deleteNote(id) {
  console.log('deleteNote: ', id)
  del.value = true
}

async function refreshNotes() {
  await notesStore.loadNotes()
  notes.value = notesStore.getNotes
  console.log('refreshNotes')
}

function newNote() {
  console.log('newNote')

  editorStore.new()
  edit.value = true
}

function editNote(id) {
  const editorNote = notesStore.getNotes.find((x) => x.id == id)

  if (editorNote != undefined) {
    editorStore.edit(editorNote)
    edit.value = true
  }
}

function cleanHtml(string) {
  return string.replace(/<\/?[^>]+(>|$)/g, '')
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
