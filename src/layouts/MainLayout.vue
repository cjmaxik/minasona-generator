<template>
  <q-layout view="hHr lpr lFr">
    <page-header />

    <page-drawer />

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar class="justify-center">
        <div class="q-pa-md q-gutter-sm">
          <q-btn color="white" text-color="black" label="Undo" />
          <q-btn color="white" text-color="black" label="Redo" />
          <q-btn color="white" text-color="black" label="Random" />
          <q-btn color="white" text-color="black" label="Save" />
        </div>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script setup>
defineOptions({
  name: 'MainLayout'
})

import PageHeader from 'components/PageHeader.vue'
import PageDrawer from 'components/PageDrawer.vue'
</script>
