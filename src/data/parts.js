export default {
  base: {
    default: () => import('assets/parts/base/default.svg?raw')
  },
  contour: {
    default: () => import('assets/parts/contour/default.svg?raw')
  },
  eyes: {
    default: () => import('assets/parts/eyes/default.svg?raw'),
    excited: () => import('assets/parts/eyes/excited.svg?raw')
  },
  mouth: {
    default: () => import('assets/parts/mouth/default.svg?raw')
  }
}
