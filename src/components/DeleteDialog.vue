<template>
  <q-dialog>
    <q-card>
      <q-toolbar>
        <q-toolbar-title>Delete Note</q-toolbar-title>
      </q-toolbar>

      <q-card-section> Are you sure you want to delete this note? </q-card-section>

      <q-toolbar>
        <q-space />
        <q-btn flat class="text-negative" label="Yes" v-close-popup />
        <q-btn flat label="No" v-close-popup />
      </q-toolbar>
    </q-card>
  </q-dialog>
</template>

<script></script>

<style></style>
