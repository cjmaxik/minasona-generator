<template>
  <q-item dense v-ripple clickable :active="isActive" @click="store.setMinasonaPart(type, id)">
    <q-item-section style="text-transform: capitalize;">
      <q-item-label>{{ props.id }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup>
import { useMinasonaStore } from 'stores/minasonaStore'
const store = useMinasonaStore()

const props = defineProps({
  type: {
    type: String,
    required: true
  },

  id: {
    type: String,
    required: true
  },

  isActive: {
    type: Boolean,
    required: true
  }
})
</script>
