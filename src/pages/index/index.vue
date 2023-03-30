<template>
  <view class="index_content">
    <skeleton v-if="showLoading" />
    <view v-else class="index_body">
      <view class="h-300rpx w-300rpx bg-[#000] text-[red] rounded-20rpx text-40rpx m-111rpx p-10rpx flex-center-align">
        测试unocss
      </view>
      <view class="mt-20rpx">
        <button type="button" @click="goto_aa">
          跳转pagesA aa
        </button>
      </view>
      <view class="mt-20rpx">
        <button type="button" @click="goto_hook_test">
          测试hooks aa
        </button>
      </view>
      <view class="mt-20rpx">
        <button type="button" @click="goto_hook_stop">
          中断 hook pagesA aa
        </button>
      </view>
      <view class="mt-20rpx">
        <button type="button" @click="goto_aa22">
          跳转pagesA aa22 [需要授权] before after
        </button>
      </view>
      <view class="mt-20rpx">
        <button type="button" @click="goto_bb">
          跳转pagesB bb [需要授权] before
        </button>
      </view>
      <view class="mt-20rpx">
        <button type="button" @click="goto_bb22">
          跳转pagesB bb22 [需要授权]
        </button>
      </view>
      <view class="mt-20rpx">
        <button type="button" @click="action">
          我是引入调用 Action api
        </button>
      </view>

      <button class="mt-20rpx" @click="test_action">
        test api
      </button>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { useRouter, useRoute } from 'imba-uni-router'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

const showLoading = ref(true)
// const list = ref([
//   {
//     image: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
//     title: '昨夜星辰昨夜风，画楼西畔桂堂东',
//   },
//   {
//     image: 'https://cdn.uviewui.com/uview/swiper/2.jpg',
//     title: '身无彩凤双飞翼，心有灵犀一点通',
//   },
//   {
//     image: 'https://cdn.uviewui.com/uview/swiper/3.jpg',
//     title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳',
//   },
// ])

onLoad(() => {
  showLoading.value = false
})

// store用法
// const storeFun = () => {
//   userStore.token = '1111'
//   userStore.setCache('aaa', 'bbb')
// }

const goto_aa = () => {
  router
    .hooks((next) => {
      console.log('我是goto_aa hook 头号选手')
      next()
    })
    .push('/pagesA/aa/aa', { aa: 'key', bb: 111 })
    .hooks((next) => {
      console.log('我是goto_aa hook 车尾选手')
      next()
    })
}

const goto_hook_test = () => {
  const sleep = () => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve()
      }, 300)
    })
  }

  router
    .hooks((next) => {
      uni.showLoading({ title: '加载中' })
      console.log('sync 1--------')
      next()
      // next(false) 传入true 或 false 不传默认为true
    })
    .hooks((next) => {
      console.log('sync 2--------')
      next()
    })
    .hooks((next) => {
      console.log('sync 3--------')
      next()
    })
    .hooks((next) => {
      console.log('async 4---------')
      setTimeout(() => {
        console.log('async 5---------')
        next()
      }, 333)
    })
    .hooks((next) => {
      console.log('6---------')
      new Promise<void>((resolve) => {
        setTimeout(() => {
          console.log('7---------')
          resolve()
        }, 300)
      }).then(() => {
        next()
      })
    })
    .hooks(async (next) => {
      console.log('8---------')
      await sleep()
      console.log('9---------')
      await next()
    })
    .hooks((next) => {
      console.log('Promise then 10---------')
      sleep().then(() => {
        console.log('Promise then 11-------------')
        next()
      })
    })
    .push('/pages/index/user', { aa: 'i am params' }, { bb: 'i am query' })
    .hooks((next) => {
      console.log('hooks 12--------------')
      next()
      console.log('hooks 13----------------')
    })
    .hooks((next) => {
      console.log('last hooks 14-------------')
      uni.hideLoading()
      next()
    })

  setTimeout(() => {
    router.push('/pagesA/aa22/aa22')
    setTimeout(() => {
      router.push('/pagesB/bb/bb')
      setTimeout(() => {
        uni.navigateBack()
        console.log('%c [ router ]-94', 'font-size:14px; background:#41b883; color:#ffffff;', router)
      }, 18000)
    }, 12000)
  }, 6000)
}

const goto_hook_stop = () => {
  router
    .hooks((next) => {
      console.log('返回false中断跳转和后面的hooks')
      next(false)
    })
    .push('/pagesA/aa/aa', { aa: 'fff' })
    .hooks((next) => {
      console.log('2222222222222222')
      next()
    })
}

const goto_bb = () => {
  router
    .hooks((next) => {
      // if (userStore.userRole.length === 0) console.error('不登录点我肯定报错!')
      next()
    })
    .push('pagesB/bb', { bb: 'www' })
    .hooks((next) => {
      console.log('登陆了，就执行到这里嘛!')
      next()
    })
}

const goto_aa22 = () => {
  router.push('pagesA/aa22', { bb: 'gggg' })
}

const goto_bb22 = () => {
  router.push('pagesB/bb22', { bb: 'qwer' })
}

const action = () => {
  console.log('11111111', 11111111)
  // const test_api_get_test = () => getTest() // 请求test_api.js 里的 get_test
  // const test_api_get_test222 = () => getTest222({ _id: 222 }) // 请求test_api.js 里的 get_test222
  // const test_api_get_test333 = () => getTest333({ is: 'param', xx: 'xx' }) // 请求test_api.js 里的 get_test222
  // const app_111 = () => getTest({ test: '111' })
  // const app_222 = () => getTest({ _id: 222 })
  // const app_333 = () => getTest({ _id: 333 })
  // const app_444 = () => getTest({ test: '444' })
  // const app_555 = () => getTest({ test: '555' })
  // const app_666 = () => getTest({ _id: 666, body: '这是POST请求,我是body' })
  // const user_get_user = () => getTest()
  // const all_request = () => {
  //   const all = [
  //     test_api_get_test,
  //     test_api_get_test222,
  //     test_api_get_test333,
  //     app_111,
  //     app_222,
  //     app_333,
  //     app_444,
  //     app_555,
  //     app_666,
  //     user_get_user,
  //   ]
  //   // const pro: Array<Promise<any>> = []
  //   // all.forEach(request => pro.push(request()))
  //   // Promise.allSettled(pro).then(res => setTimeout(() => console.log('Promise.allSettled=', res), 10))
  // }
  // all_request()
}

const test_action = () => {
  // getTest('app_111', {}) // 中断请求 放在body里面
  // getTest('app_222', { _id: 222 }) // api/:id/fff
  // getTest('app_333', { _id: 222 })
  // getTest('app_444')
  // getTest('app_555')
  // getTest('app_666', { _id: 666 })
  // getTest('app_111', {}) // 中断请求 放在body里面
  // getTest('app_222', { _id: 222 }) // api/:id/fff
  // getTest('app_333', { _id: 222 })
  // getTest('app_444')
  // getTest('app_555')
  // getTest('app_666', { _id: 666 })
}
</script>

<style scoped>
.index_content {
  font-size: 50rpx;
}

.test_size {
  height: 200upx;
  width: 400upx;
  border: 1upx solid red;
}
</style>
