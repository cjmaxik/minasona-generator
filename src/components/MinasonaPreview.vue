<template>
  <q-card flat class="bg-transparent">
    <q-card-section>
      <div class="minasona" v-html="svgData" />
    </q-card-section>

    <q-card-actions class="justify-center">
      <q-btn color="white" text-color="black" label="Randomize" @click="randomize" />
      <q-btn color="white" text-color="black" label="Save" @click="saveImage" />
    </q-card-actions>
  </q-card>
</template>

<script setup>
import { ref, onMounted } from 'vue'

import { useMinasonaStore } from 'stores/minasonaStore'
const store = useMinasonaStore()

const svgData = ref('')

const generateSvg = async () => {
  const currentSvg = await store.generateCurrentMinasona()

  svgData.value = `
    <svg
      width="500"
      height="500"
      viewBox="0 0 500 500"
      preserveAspectRatio="xMidYMax meet"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        ${currentSvg.join('')}
      </g>
    </svg>
  `
}

const randomize = () => {
  const partsList = Object.keys(store.parts)

  const minasona = store.currentMinasona

  partsList.forEach((partType) => {
    minasona[partType] = [
      // select a random value from the store.parts[partType] object
      Object.keys(store.parts[partType])[Math.floor(Math.random() * Object.keys(store.parts[partType]).length)],

      // generate a random color in HEX
      '#' + Math.floor(Math.random() * 16777215).toString(16)
    ]
  })

  store.currentMinasona = minasona
}

const saveImage = () => {
  // Create a canvas
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  const svg = new Blob([svgData.value], { type: 'image/svg+xml;charset=utf-8' })
  const DOMURL = window.URL || window.webkitURL || window
  const url = DOMURL.createObjectURL(svg)

  // Create an image and render the SVG on the canvas
  const img = new Image()
  img.onload = function () {
    canvas.width = 500
    canvas.height = 500
    ctx.drawImage(img, 0, 0)
    DOMURL.revokeObjectURL(url)

    // Convert canvas to data URL
    const imageUrl = canvas.toDataURL('image/png')

    // Create a link and set the URL as the href
    const link = document.createElement('a')
    link.download = 'minasona.png'
    link.href = imageUrl
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
  img.src = url
}

store.$subscribe(async (_mutation, _store) => {
  await generateSvg()
}, { detached: true })

onMounted(async () => {
  await generateSvg()
})
</script>
