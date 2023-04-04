import type { StoreOptions } from 'vuex'
import type { authStore_DTYPE } from '#/store/auth'
import type { commitSet_DTYPE } from '#/store/index'
import { setCacheLoca } from 'imba-uni-cache'

const WHITELIST = ['/login']

export default {
  namespaced: true,
  state: () => {
    return {
      whiteList: uni.getStorageSync('whiteList') || WHITELIST,
      authList: uni.getStorageSync('authList') || [],
    }
  },
  mutations: {
    set(state, [key, val, cache]: commitSet_DTYPE<authStore_DTYPE>) {
      state[key] = val
      if (cache) setCacheLoca(key, val)
    },
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
    pushWhile({ state, commit }, page: string | Array<string>) {
      const whiteList = state.whiteList
      if (typeof page === 'string') {
        whiteList.push(page)
      } else {
        for (const key of page) {
          if (state.whiteList.includes(key)) continue
          whiteList.push(key)
        }
      }
      commit('set', ['whiteList', whiteList, true])
    },
    pushAuth({ state, commit }, auth: string | Array<string>) {
      const authList = state.authList
      if (typeof auth === 'string') {
        authList.push(auth)
      } else {
        for (const key of auth) {
          if (authList.includes(key)) continue
          authList.push(key)
        }
      }
      commit('set', ['authList', authList, true])
    },
  },
} as StoreOptions<authStore_DTYPE>
