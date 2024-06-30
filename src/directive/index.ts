import type { App } from 'vue'

interface res_DTYPE { default: (app: App) => void }
const modules = import.meta.glob('./module/*.ts', { eager: true })

export default {
  install: (app: App) => {
    Object.values(modules).forEach((res: any) => {
      console.log('%c [ res ]-9', 'font-size:14px; background:#41b883; color:#ffffff;', res)
      res.default(app)
    })
  },
}
