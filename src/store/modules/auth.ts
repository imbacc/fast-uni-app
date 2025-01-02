import type { authStore_DTYPE } from '#/store/auth'

const WHITELIST = ['/login', '/401', '/404']

export const useAuthStore = defineStore('auth', {
  state: (): authStore_DTYPE => {
    return {
      // 路由白名单
      whiteIgnoreList: WHITELIST,
      // 路由权限
      routerAuthList: [],
      // 粒度权限
      meshAuthList: [],
    }
  },
  getters: {
    hasWhiteIgnore(state) {
      return (path: string) => state.whiteIgnoreList.includes(path)
    },
    hasRouterAuth(state) {
      return (list: Array<string>) => list.every((s) => state.routerAuthList.includes(s))
    },
    hasMeshAuth(state) {
      return (list: Array<string>) => list.every((s) => state.meshAuthList.includes(s))
    },
  },
  actions: {
    pushWhiteIgnore(page: string | Array<string>) {
      this._pushValue(page, 'whiteIgnoreList')
    },
    pushRouterAuth(auth: string | Array<string>) {
      this._pushValue(auth, 'routerAuthList')
    },
    pushMeshAuth(auth: string | Array<string>) {
      this._pushValue(auth, 'meshAuthList')
    },
    _pushValue(page: string | Array<string>, key: keyof authStore_DTYPE) {
      const list: Array<string> = this[key]
      const concat = Array.isArray(page) ? [...new Set([...list, ...page])] : [page]
      list.push(...concat)
      this.utSetCache({ [key]: list })
    },
  },
})
