import type { userRole_TYPE, user_DTYPE } from '#/store/user'

import { setCacheLoca, getCacheLoca, delCache } from 'imba-cache'
import { defineStore } from 'pinia'

const TOKEN = getCacheLoca('token') || ''
const USER_INFO = getCacheLoca('userInfo') || {}
const USER_ROLE = getCacheLoca('userRole') || []

export const useUserStore = defineStore('user', {
  state: (): user_DTYPE => {
    return {
      token: TOKEN, // 用户token
      userInfo: USER_INFO, // 用户信息
      userRole: USER_ROLE, // 用户角色权限
    }
  },
  getters: {
    hasLogin(): boolean {
      return (this.token || this.userInfo || false) as boolean
    },
    getRole(): userRole_TYPE {
      return this.userRole
    },
  },
  actions: {
    setCache(key: string, val: any) {
      this.$patch({ [key]: val })
      setCacheLoca(key, val)
    },
    setRole(role: userRole_TYPE) {
      this.userRole = [...new Set([...this.userRole, ...role])]
      setCacheLoca('userRole', this.userRole)
    },
    setLogout() {
      this.$patch({ token: '', userInfo: false, userRole: [] })
      delCache('token')
      delCache('userInfo')
      delCache('userRole')
    },
  },
})
