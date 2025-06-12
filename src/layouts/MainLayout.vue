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
              <q-item-label>{{ users.getUser.email }}</q-item-label>
            </q-item-section>
          </template>

          <q-btn-group spread outline>
            <q-btn flat color="primary" icon="groups" to="/groups">Groups</q-btn>
            <q-btn flat color="primary" icon="settings" to="/settings">Settings</q-btn>
            <q-btn flat color="negative" icon="logout" to="/">Logout</q-btn>
          </q-btn-group>
        </q-expansion-item>

        <q-separator />

        <!-- Sidebar Tabs -->
        <q-tabs v-model="tab" class="primary" inline-label>
          <q-tab name="tags" icon="bookmark_border" label="" />
          <!--<q-tab name="favourites" icon="star_outline" label="" />-->
          <q-tab name="recent" icon="schedule" label="" />
        </q-tabs>

        <q-tab-panels v-model="tab" animated>
          <!-- All Tags -->
          <q-tab-panel name="tags">
            <div class="text-h6">Tags</div>

            <!-- Tag Search Element -->
            <q-select
              outlined
              square
              v-model="selectedTags"
              multiple
              :options="tags"
              stack-label
              label="Search tags"
              @filter="tagsFilter"
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
          </q-tab-panel>

          <!-- Favourite Tags -->
          <q-tab-panel name="favourites">
            <div class="text-h6">Favourites</div>
            <q-list separator>
              <q-item v-for="tag in favourites" :key="tag.id" clickable>
                <q-item-section>
                  <q-item-label>{{ tag.label }}</q-item-label>
                </q-item-section>

                <q-item-section side>
                  <div class="q-gutter-m text-dark">
                    <q-btn flat dense icon="star_outline" label="" @click="deleteFavourite(tag)" />
                  </div>
                </q-item-section>
              </q-item>
            </q-list>
          </q-tab-panel>

          <!-- Recent Tags -->
          <q-tab-panel name="recent">
            <div class="text-h6">Recent</div>
            <q-list separator>
              <q-item v-for="tag in recent" :key="tag.id" clickable>
                <q-item-section>
                  <q-item-label>{{ tag.label }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-tab-panel>
        </q-tab-panels>
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
import { useTagsStore } from 'src/stores/tagsStore'
import { useNotesStore } from 'src/stores/notesStore'

const users = useUsersStore()
const tagStore = useTagsStore()
const notesStore = useNotesStore()

if (notesStore.getNotes.length == 0) {
  notesStore.update()
}

if (tagStore.getTags.length == 0) {
  tagStore.update()
}

const tags = tagStore.getTags
const userRefs = storeToRefs(users)

const tab = userRefs.tab
const recent = userRefs.recent
const favourites = userRefs.favourites

const leftDrawerOpen = ref(false)
const selectedTags = ref([])

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

function tagsFilter(val, update) {
  const options = ref(tags)

  if (val === '') {
    update(() => {
      options.value = tags
    })
    return
  }

  update(() => {
    const needle = val.toLowerCase()
    options.value.label = tags.filter((v) => v.label.toLowerCase().indexOf(needle) > -1)
  })
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
