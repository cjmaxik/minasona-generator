<template>
  <q-drawer show-if-above persistent side="right" behavior="desktop">
    <q-list dense>
      <q-item-label header>
        Minasona Parts
      </q-item-label>

      <div v-for="(parts, index) in partsData" :key="parts.title">
        <q-item-label header style="text-transform: capitalize;">
          {{ parts.title }}
        </q-item-label>

        <MinasonaParts v-for="part in parts.parts" :key="part.id" v-bind="part" :is-active="store.currentMinasona[parts.title][0] === part.id" />

        <q-input dense filled v-model="store.currentMinasona[parts.title][1]">
          <template v-slot:append>
            <q-icon name="colorize" class="cursor-pointer" :style="{ color: store.currentMinasona[parts.title][1] }">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-color v-model="store.currentMinasona[parts.title][1]" default-view="palette" format-model="hex" no-header-tabs />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>

        <q-separator size="1rem" v-if="index < partsData.length - 1" />
      </div>
    </q-list>
  </q-drawer>
</template>

<script setup>
import MinasonaParts from 'components/MinasonaParts.vue'

import { useMinasonaStore } from 'stores/minasonaStore'
const store = useMinasonaStore()

// generate list from parts.js
const partsData = []
Object.keys(store.parts).forEach((partType) => {
  const type = {
    title: partType,
    parts: []
  }

  Object.keys(store.parts[partType]).forEach((partId) => {
    type.parts.push({
      type: partType,
      id: partId
    })
  })

  partsData.push(type)
})
</script>
