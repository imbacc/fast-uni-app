import type { StoreOptions } from 'vuex'
import type { versionStore_DTYPE } from '#/store/version'
import type { commitSet_DTYPE } from '#/store/index'
import { setCacheLoca } from 'imba-uni-cache'

const SYSTEM_INFO = uni.getSystemInfoSync() // 获取system信息
const isDev = true

export default {
  namespaced: true,
  state: () => {
    return {
      systemInfo: SYSTEM_INFO,
    }
  },
  mutations: {
    set(state, [key, val, cache]: commitSet_DTYPE<versionStore_DTYPE>) {
      state[key] = val
      if (cache) setCacheLoca(key, val)
    },
  },
  getters: {
  },
  actions: {
    async updateVersion() {
      if (isDev) {
        console.log('开发环境 不检测更新!')
        return
      }
      const updateManager = uni.getUpdateManager()

      updateManager.onCheckForUpdate((res) => {
        // 请求完新版本信息的回调
        // console.log(res.hasUpdate)
      })

      updateManager.onUpdateReady((res) => {
        uni.showModal({
          title: '更新提示',
          content: '新版本已经准备好，是否重启应用？',
          success(res) {
            if (res.confirm) {
              // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
              updateManager.applyUpdate()
            }
          },
        })
      })

      updateManager.onUpdateFailed((res) => {
        // 新的版本下载失败
        uni.showModal({
          title: '提示',
          content: '当前版本过低，无法使用此功能，请升级最新版本',
          showCancel: false,
        })
      })
    },
  },
} as StoreOptions<versionStore_DTYPE>
