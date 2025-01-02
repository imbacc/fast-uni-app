export default (router) => {
  router.beforeEach((to: any, from, next) => {
    console.log('beforeEach1111111')

    const userStore = useUserStore()
    const authStore = useAuthStore()

    // 白名单跳过
    if (authStore.hasWhiteIgnore(to.path)) {
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
    console.log('%c [ metaAuth ]-31', 'font-size:14px; background:#41b883; color:#ffffff;', metaAuth)
    // 判断是否有权限
    if (metaAuth) {
      console.log('%c [ authStore ]-35', 'font-size:14px; background:#41b883; color:#ffffff;', toRaw(authStore.$state))
      if (!authStore.hasRouterAuth(metaAuth)) {
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
}
