<template>
  <q-layout view="hHr lpr lFr">
    <page-header />

    <page-drawer />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
defineOptions({
  name: 'MainLayout'
})

import PageHeader from 'components/PageHeader.vue'
import PageDrawer from 'components/PageDrawer.vue'
</script>
