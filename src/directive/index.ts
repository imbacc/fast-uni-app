import type { App } from 'vue'

const modules = import.meta.glob('./module/*.ts', { eager: true })

export default {
  install: (app: App) => {
    Object.values(modules).forEach((res: any) => res.default(app))
  },
}
