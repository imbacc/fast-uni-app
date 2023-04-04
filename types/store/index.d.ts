import type { Commit, Dispatch } from 'vuex'

import type { userStore_DTYPE } from './user'
import type { authStore_DTYPE } from './auth'
import type { versionStore_DTYPE } from './version'
import type { webviewStore_DTYPE } from './webview'

type Content_DTYPE<T, KEY = keyof T> = Record<KEY, T[KEY]> & {
  commit: Commit
  dispatch: Dispatch
  getters: Record<string, any>
}

export type commitSet_DTYPE<T> = [keyof T, any] | [keyof T, any, boolean]

export type Store_DTYPE = { 
  user: Content_DTYPE<userStore_DTYPE>, 
  auth: Content_DTYPE<authStore_DTYPE>,
  version: Content_DTYPE<versionStore_DTYPE>,
  webview: Content_DTYPE<webviewStore_DTYPE>,
}