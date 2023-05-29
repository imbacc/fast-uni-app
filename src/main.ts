import { createSSRApp } from 'vue'
import App from './App.vue'

import 'uno.css'

import { createPinia } from 'pinia'
import router from '@/router/index'
import direct from '@/directive/index'

export function createApp() {
  const app = createSSRApp(App)
  app.use(createPinia())
  app.use(router)
  app.use(direct)

  // //导入组件全局
  // app.component('skeleton', skeleton)

  // 导入Minix全局
  // app.mixin(goto_page)

  // 处理错误
  // app.config.errorHandler = (err, vm, info) => {
  //   // `info` 是 Vue 特定的错误信息，比如错误所在的生命周期钩子
  // }

  return {
    app,
  }
}
