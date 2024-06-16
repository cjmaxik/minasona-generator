import { defineStore, acceptHMRUpdate } from 'pinia'
import parts from 'data/parts.js'

export const useMinasonaStore = defineStore('minasona', {
  state: () => ({
    parts,

    currentMinasona: {
      base: ['default', '#FF0'],
      contour: ['default', '#F1F'],
      eyes: ['default', '#0F0'],
      mouth: ['default', '#00F']
    }
  }),

  getters: {
  },

  actions: {
    async getPart (layer, partId) {
      if (!this.parts[layer] || !this.parts[layer][partId]) {
        console.error(`Part not found: ${layer} ${partId}`)
      }

      try {
        const module = await this.parts[layer][partId]()
        return module?.default
      } catch (error) {
        console.error(`Failed to load part: ${layer} ${partId}`, error)
      }
    },

    async generateCurrentMinasona () {
      return await Promise.all(Object.keys(this.currentMinasona).map(async (layer) => {
        const [partId, color] = this.currentMinasona[layer]

        const rawSvg = await this.getPart(layer, partId)
        const svg = rawSvg
          .slice(rawSvg.indexOf('>', rawSvg.indexOf('<svg')) + 1)
          .replace('</svg>', '')
          .replaceAll('$fillColor', color || 'transparent')

        return `
          <g id="minasona-${layer}">
            ${svg}
          </g>
        `
      }))
    },

    setMinasonaPart (part, value) {
      this.currentMinasona[part][0] = value
    }
  }
})

if (import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(useMinasonaStore, import.meta.hot))
