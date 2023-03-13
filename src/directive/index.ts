import type { App } from 'vue'

interface res_DTYPE { default: (app: App) => void }
const modules = import.meta.globEager('./module/*.ts')

export default {
  install: (app: App) => {
    Object.values(modules).forEach((res) => {
      res.default(app)
    })
  },
}
