import { createSSRApp } from 'vue'
import App from './App.vue'

import 'uno.css'

import { createPiniaStore } from '@/store/create'
import { createRouterMode } from '@/router/create'
import { initStorageGlobalUni } from 'imba-uni-cache'

export function createApp() {
  const app = createSSRApp(App)

  initStorageGlobalUni()
  app.use(createPiniaStore())
  app.use(createRouterMode())

  return {
    app,
  }
}
