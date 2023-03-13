import type { authStore_DTYPE } from '#/store/auth'

import { getCacheLoca } from 'imba-cache'

const WHITELIST = ['/login', '/401', '/404']

export const useAuthStore = defineStore('auth', {
  state: (): authStore_DTYPE => {
    return {
      whiteList: getCacheLoca('whiteList') || WHITELIST,
      authList: getCacheLoca('authList') || [],
    }
  },
  getters: {
    hasAuth(state) {
      return (list: Array<string>) => list.some((s) => state.authList.includes(s))
    },
    hasIgnore(state) {
      return (path: string) => state.whiteList.includes(path)
    },
  },
  actions: {
    setStoreCache(params: Partial<key_valueof_CONVERT<authStore_DTYPE>>) {
      useSetStoreCache(this, params)
    },
    clear() {
      useClearStore(this)
    },
    pushWhile(page: string | Array<string>) {
      if (typeof page === 'string') {
        this.whiteList.push(page)
      } else {
        for (const key of page) {
          if (this.whiteList.includes(key)) continue
          this.whiteList.push(key)
        }
      }
      this.setStoreCache({ whiteList: this.whiteList })
    },
    pushAuth(auth: string | Array<string>) {
      if (typeof auth === 'string') {
        this.authList.push(auth)
      } else {
        for (const key of auth) {
          if (this.authList.includes(key)) continue
          this.authList.push(key)
        }
      }
      this.setStoreCache({ authList: this.authList })
    },
  },
})
