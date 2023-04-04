<template>
  <view class="content">
    <image class="logo" src="../../static/logo.png" />
    <view>
      <view class="h-300rpx w-300rpx bg-[#000] text-[red] rounded-20rpx text-40rpx m-111rpx p-10rpx flex-center-align">
        测试unocss
      </view>
      <text class="title">
        {{ title }}
      </text>
    </view>

    <!-- <view class="mt-20rpx">
      <button type="button" @click="aa">
        跳转pagesA aa
      </button>
    </view>
    <view class="mt-20rpx">
      <button type="button" @click="bb">
        测试hooks aa
      </button>
    </view> -->
  </view>
</template>

<script lang="ts">
import Vue from 'vue'
const router = useRouter()

export default Vue.extend({
  data() {
    return {
      title: 'Hello',
    }
  },
  onLoad() {

  },
  methods: {
    // aa() {
    //   router
    //     .hooks((next) => {
    //       console.log('我是goto_aa hook 头号选手')
    //       next()
    //     })
    //     .push('/pagesA/aa/aa', { aa: 'key', bb: 111 })
    //     .hooks((next) => {
    //       console.log('我是goto_aa hook 车尾选手')
    //       next()
    //     })
    // },
    // bb() {
    //   const sleep = () => {
    //     return new Promise<void>((resolve) => {
    //       setTimeout(() => {
    //         resolve()
    //       }, 300)
    //     })
    //   }

    //   router
    //     .hooks((next) => {
    //       uni.showLoading({ title: '加载中' })
    //       console.log('sync 1--------')
    //       next()
    //       // next(false) 传入true 或 false 不传默认为true
    //     })
    //     .hooks((next) => {
    //       console.log('sync 2--------')
    //       next()
    //     })
    //     .hooks((next) => {
    //       console.log('sync 3--------')
    //       next()
    //     })
    //     .hooks((next) => {
    //       console.log('async 4---------')
    //       setTimeout(() => {
    //         console.log('async 5---------')
    //         next()
    //       }, 333)
    //     })
    //     .hooks((next) => {
    //       console.log('6---------')
    //       new Promise<void>((resolve) => {
    //         setTimeout(() => {
    //           console.log('7---------')
    //           resolve()
    //         }, 300)
    //       }).then(() => {
    //         next()
    //       })
    //     })
    //     .hooks(async (next) => {
    //       console.log('8---------')
    //       await sleep()
    //       console.log('9---------')
    //       await next()
    //     })
    //     .hooks((next) => {
    //       console.log('Promise then 10---------')
    //       sleep().then(() => {
    //         console.log('Promise then 11-------------')
    //         next()
    //       })
    //     })
    //     .push('/pages/index/user', { aa: 'i am params' }, { bb: 'i am query' })
    //     .hooks((next) => {
    //       console.log('hooks 12--------------')
    //       next()
    //       console.log('hooks 13----------------')
    //     })
    //     .hooks((next) => {
    //       console.log('last hooks 14-------------')
    //       uni.hideLoading()
    //       next()
    //     })
    // },
  },
})
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin: 200rpx auto 50rpx auto;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
