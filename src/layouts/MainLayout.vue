<template>
  <!-- Toolbar -->
  <q-layout view="hHh lpR fFf">
    <q-header>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

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
              <q-item-label>philipp.theiss@aisys-media.de</q-item-label>
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
          <q-tab name="recent" icon="schedule" label="" />
          <q-tab name="favourites" icon="star_outline" label="" />
          <q-tab name="search" icon="search" label="" />
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

          <q-tab-panel name="search">
            <div class="text-h6">Search</div>
            <!-- Sidebar Tags -->
            <q-input outlined bottom-slots v-model="text" label="Search tags">
              <template v-slot:prepend>
                <q-icon name="search" />
              </template>
            </q-input>
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

const leftDrawerOpen = ref(false)
const tab = ref('recent')

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
