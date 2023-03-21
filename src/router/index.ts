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
        next('/login')
        return
      }

      console.log('%c [ meta ]-26', 'font-size:14px; background:#41b883; color:#ffffff;', to.meta)
      const metaAuth = to.meta.auth as Array<string>
      console.log('%c [ metaAuth ]-26', 'font-size:14px; background:#41b883; color:#ffffff;', metaAuth)
      // 判断是否有权限
      if (metaAuth) {
        if (!authStore.hasAuth(metaAuth)) {
          console.error('没有权限!', window?.location?.pathname)
          next('/401')
          return
        }
      }

      next()
    })

    router.onError((err: any) => {
      console.log('%c [ err ]-18', 'font-size:14px; background:#41b883; color:#ffffff;', err)
    })
  },
}
