<template>
  <q-page class="flex">
    <div class="div">
      <q-toolbar class="bg-grey-3 toolbar">
        <q-toolbar-title> Settings </q-toolbar-title>
      </q-toolbar>

      <q-list bordered separator class="settingsList">
        <q-item v-for="setting in settings" :key="setting.id" clickable>
          <q-item-section>
            <q-item-label overline>{{ setting.title }}</q-item-label>
            <q-item-label>{{ setting.description }}</q-item-label>
          </q-item-section>

          <q-item-section side>
            <div class="q-gutter-xs text-dark">
              <q-toggle v-model="toggle" />
            </div>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useUsersStore } from 'src/stores/usersStore'

// Stores
const usersStore = useUsersStore

// V-Models / Refs
const settings = usersStore.getSettings
const toggle = ref(true)

// Functions
</script>

<style>
.div {
  width: 100%;
  padding: 0;
}

.settingsList {
  margin-top: 0;
  width: 100%;
}
</style>
