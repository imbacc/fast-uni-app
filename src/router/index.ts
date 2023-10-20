import { router } from '@/router/create'

export default {
  install: () => {
    router.beforeEach((to: any, from, next) => {
      console.log('beforeEach1111111')

      const userStore = useUserStore()
      const authStore = useAuthStore()

      // 白名单跳过
      if (authStore.hasIgnore(to.path)) {
        next()
        return
      }

      // 没有登陆
      if (!userStore.hasLogin) {
        uni.$emit('showLoginPopup', true)
        uni.showToast({ title: '没有登录!', icon: 'none' })
        next(false)
        return
      }

      //  // 没有绑定手机号
      //  if (!userStore.userInfo?.phone) {
      //   uni.$emit('showLoginPopup', true)
      //   uni.showToast({ title: '请绑定手机号!', icon: 'none' })
      //   next(false)
      //   return
      // }

      const metaAuth = to.auth as Array<string>
      // 判断是否有权限
      if (metaAuth) {
        if (!authStore.hasAuth(metaAuth)) {
          uni.showModal({ title: '系统提示', content: '没有权限!', showCancel: false })
          next(false)
          return
        }
      }

      next()
    })

    router.onError((err: any) => {
      console.log('%c [ router error ]', 'font-size:14px; background:red; color:#ffffff;', err)
    })
  },
}
