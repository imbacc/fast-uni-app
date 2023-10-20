import type { userStore_DTYPE } from '#/store/user'

import { getCacheLoca } from 'imba-uni-cache'

export const useUserStore = defineStore('user', {
  state: (): userStore_DTYPE => {
    return {
      openid: uni.getStorageSync('openid') || '',
      token: uni.getStorageSync('token') || '',
      userInfo: getCacheLoca('userInfo') || {},
    }
  },
  getters: {
    hasLogin(state): boolean {
      return Boolean(state.token && state.userInfo?.id)
    },
  },
  actions: {
    setStoreCache(params: Partial<key_valueof_CONVERT<userStore_DTYPE>>) {
      useSetStoreCache(this, params)
    },
    logout() {
      useClearStore(this)
    },
    userLogin() {
      return new Promise<void>((resolve) => {
        if (this.userInfo?.id && this.openid) {
          setTimeout(() => uni.$emit('homeInit'))
          resolve()
          return
        }
        uni.showLoading({ title: '加载中...', mask: true })
        const authStore = useAuthStore()
        uni.login({
          provider: 'weixin',
          scopes: ['auth_base'],
          success: ({ code }) => {
            getUserinfoApi(code).then((res) => {
              console.log('%c [ res ]-37', 'font-size:14px; background:#41b883; color:#ffffff;', res)
              uni.hideLoading()
              if (res) {
                this.setStoreCache({ openid: res.openid || '', token: res.token || '' })
                setTimeout(() => uni.$emit('homeInit'))
                if (res.id) {
                  this.setStoreCache({ userInfo: res })
                  authStore.pushAuth('user')
                  if (!res.id || !res.phone) {
                    const cur = getCurrentPages()
                    if (cur[0].route === 'pages/login/login') return
                    uni.$emit('showLoginPopup', true)
                  }
                }
                resolve()
              } else {
                resolve()
              }
            })
          },
          fail: () => {
            uni.hideLoading()
            uni.showToast({ title: 'Code授权失败!', icon: 'none' })
            resolve()
          },
        })
      })
    },
  },
})
