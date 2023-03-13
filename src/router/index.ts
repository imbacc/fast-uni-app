import { router } from '@/router/create'

const sleep = () => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, 600)
  })
}

export default {
  install: () => {
    router.beforeEach((to, from, next) => {
      console.log('beforeEach1111111')
      next()
    })

    router.beforeEach((to, from, next) => {
      uni.showLoading({ title: 'beforeEach222222' })
      setTimeout(() => {
        console.log('beforeEach222222')
        uni.hideLoading()
        next()
      }, 300)
    })

    router.afterEach((to, from) => {
      console.log('afterEach-----------')
    })

    router.beforeEach(async (to, from, next) => {
      uni.showLoading({ title: 'beforeEach333333333' })
      await sleep()
      uni.hideLoading()
      console.log('beforeEach333333333')
      next()
    })

    router.afterEach((to, from) => {
      console.log('%c [ to ]-7', 'font-size:14px; background:#41b883; color:#ffffff;', to)
      console.log('%c [ from ]-7', 'font-size:14px; background:#41b883; color:#ffffff;', from)
    })

    router.onError((err: any) => {
      console.log('%c [ err ]-18', 'font-size:14px; background:#41b883; color:#ffffff;', err)
    })
  },
}
