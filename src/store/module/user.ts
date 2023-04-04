import type { StoreOptions } from 'vuex'
import type { userStore_DTYPE } from '#/store/user'
import type { commitSet_DTYPE } from '#/store/index'

import { getUserinfo } from '@/api/user/user'

export default {
  namespaced: true,
  state: () => {
    return {
      openid: uni.getStorageSync('openid') || '', // 用户openid
      token: uni.getStorageSync('token') || '', // 用户token
      userInfo: uni.getStorageSync('userInfo') || {}, // 用户信息
    }
  },
  mutations: {
    set(state, [key, val, cache]: commitSet_DTYPE<userStore_DTYPE>) {
      state[key] = val
      if (cache) uni.setStorageSync(key, val)
    },
    logout(state) {
      state.openid = ''
      state.token = ''
      state.userInfo = {}
      uni.removeStorageSync('openid')
      uni.removeStorageSync('token')
      uni.removeStorageSync('userInfo')
    },
  },
  getters: {
    hasLogin: (state) => state.token || state.userInfo || false,
  },
  actions: {
    // 用户code授权
    userLogin({ commit, dispatch }) {
      return new Promise((resolve) => {
        uni.login({
          provider: 'weixin',
          scopes: ['auth_base'],
          success: ({ code }) => {
            getUserinfo(code).then((res) => {
              if (res) {
                if (res.openid)
                  commit('set', ['openid', res.openid, true])
                if (res.userNo) {
                  commit('set', ['userInfo', res, true])
                  commit('set', ['token', res.token, true])
                  dispatch('auth/pushAuth', ['user'], { root: true })
                  if (!res.phone) {
                    const cur = getCurrentPages()
                    if (cur[0].route === 'pages/login/login') {
                      return
                    }
                    // uni.showModal({
                    //   title: '系统提示',
                    //   content: '请绑定手机号!',
                    //   cancelText: '暂不绑定',
                    //   confirmText: '去绑定',
                    //   success: (r) => {
                    //     if (r.confirm) {
                    //       uni.$emit('showLoginPopup', true)
                    //       // uni.reLaunch({ url:'/pages/login/login', animationType:'slide-in-bottom' })
                    //     }
                    //   },
                    // })
                  }
                }
                resolve(true)
              } else {
                resolve(false)
              }
            })
          },
          fail: () => {
            uni.showToast({ title: 'Code授权失败!', icon: 'none' })
            resolve(false)
          },
        })
      })
    },
  },
} as StoreOptions<userStore_DTYPE>
