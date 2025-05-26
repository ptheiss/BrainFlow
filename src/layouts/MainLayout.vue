<template>
  <!-- Toolbar -->
  <q-layout view="hHh lpR fFf">
    <q-header>
      <q-toolbar>
        <q-btn flat dense icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title> BrainFlow </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <!-- Sidebar -->
    <q-drawer v-model="leftDrawerOpen" show-if-above bordered class="sidebar">
      <q-list>
        <!-- Sidebar Account -->
        <q-expansion-item class="account">
          <template v-slot:header>
            <q-item-section avatar>
              <q-avatar rounded size="48px" color="primary">P</q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ users.getUsername }}</q-item-label>
            </q-item-section>
          </template>

          <q-btn-group spread outline>
            <q-btn flat color="primary" icon="manage_accounts">Profile</q-btn>
            <q-btn flat color="primary" icon="settings">Settings</q-btn>
            <q-btn flat color="negative" icon="logout" to="/">Logout</q-btn>
          </q-btn-group>
        </q-expansion-item>

        <q-separator />

        <!-- Sidebar Tabs -->
        <q-tabs v-model="tab" class="primary" inline-label>
          <q-tab name="tags" icon="bookmark_border" label="" />
          <q-tab name="favourites" icon="star_outline" label="" />
          <q-tab name="recent" icon="schedule" label="" />
        </q-tabs>

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="recent">
            <div class="text-h6">Recent</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>

          <q-tab-panel name="favourites">
            <div class="text-h6">Favourites</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>

          <q-tab-panel name="tags">
            <div class="text-h6">Tags</div>

            <!-- Tag Search Element -->
            <q-input outlined bottom-slots v-model="search" label="Search tags">
              <template v-slot:prepend>
                <q-icon name="search" />
              </template>
            </q-input>

            <q-list separator class="noteList">
              <q-item v-for="tag in tags" :key="tag.id" clickable>
                <q-item-section>
                  <q-item-label>{{ tag.title }}</q-item-label>
                </q-item-section>

                <q-item-section side>
                  <div class="q-gutter-m text-dark">
                    <q-btn flat dense icon="star_outline" label="" />
                  </div>
                </q-item-section>
              </q-item>
            </q-list>
          </q-tab-panel>
        </q-tab-panels>

        <!--<EssentialLink v-for="link in linksList" :key="link.title" v-bind="link" />-->
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useUsersStore } from 'src/stores/usersStore'
//import { useSettingsStore } from 'src/stores/settingsStore'
import { useTagsStore } from 'src/stores/tagsStore'

const users = useUsersStore()
//const settings = useSettingsStore()
const tagStore = useTagsStore()
const tags = tagStore.getTags
const tagRefs = storeToRefs(tagStore)

const tab = tagRefs.tab
const search = tagRefs.search

const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>

<style>
.sidebar {
  padding: 10px;
}

.sidebar hr {
  margin: 10px;
}

.account {
  margin-bottom: 10px;
}
</style>
