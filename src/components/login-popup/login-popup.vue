<template>
  <uni-popup ref="popupRef" type="bottom">
    <view class="bg-[#fff] h-400rpx w100b border-20rpx">
      <view class="p-25rpx relative flex-align flex-between">
        <view class="flex-align">
          <uni-icons type="home" size="26" color="#666666" />
          <uni-title type="h3" title="登录" align="center" />
        </view>
        <uni-icons type="closeempty" size="26" color="#666666" @click="closePopup" />
      </view>

      <view class="flex-warp">
        <view v-if="!checkBool"
          class="w-700rpx h-64rpx bg-[#229449] rounded-8rpx text-26rpx font-bold text-[#fff] mt-20rpx flex-center-align">
          授权登录
        </view>
        <button v-else-if="userStore.userInfo.id && !userStore.userInfo.phone"
          class="w-700rpx h-64rpx bg-[#229449] rounded-8rpx text-26rpx font-bold text-[#fff] mt-20rpx flex-center-align"
          hover-class="none" lang="zh_CN" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber"
          @error="onAuthError">
          授权手机号
        </button>
        <button v-else
          class="w-700rpx h-64rpx bg-[#229449] rounded-8rpx text-26rpx font-bold text-[#fff] mt-20rpx flex-center-align"
          hover-class="none" lang="zh_CN" @click="getUserinfo">
          授权登录
        </button>
        <view class="mt-35rpx w100b flex-center-align">
          <view class="text-28rpx text-[#444444] flex-align">
            注册即代表同意
            <view class="text-[#229449]">
              用户协议
            </view>
            和
            <view class="text-[#229449]">
              隐私政策
            </view>
          </view>
        </view>
      </view>
    </view>
  </uni-popup>
</template>

<script setup lang="ts">
import type { userLogin_PARAMS } from '#/api/user'

import { uniOn } from '@/tools/mitt'

const props = defineProps<{ show: boolean }>()

const userStore = useUserStore()
const authStore = useAuthStore()

const popupRef = ref()
const checkBool = ref(true)
const atUserInfoLock = ref(false)
const atUserPhoneLock = ref(false)

watch(() => props.show, (newVal) => changePopup(newVal === true))

onMounted(() => {
  if (!userStore.openid) {
    initInfo()
  }

  uniOn('showLoginPopup', (bool) => {
    changePopup(bool)
  })
})

let t
const changePopup = (bool) => {
  clearTimeout(t)
  t = setTimeout(() => {
    clearTimeout(t)
    if (bool) {
      checkBool.value = false
      popupRef.value?.open()
    } else {
      closePopup()
    }
  })
}

const closePopup = () => {
  popupRef.value?.close()
}

const initInfo = () => {
  userStore.userLogin().then((res) => {
    atUserInfoLock.value = false
    uni.hideLoading()
  })
}

const getUserinfo = (e) => {
  if (atUserInfoLock.value) return

  if (uni.getUserProfile) {
    uni.getUserProfile({
      desc: '注册用户信息与小程序应用关联',
      lang: 'zh_CN',
      success: (e) => {
        console.log('userProfile=', e)
        const { encryptedData, iv, rawData, signature } = e
        const param: userLogin_PARAMS = {
          encryptedData,
          iv,
          signature,
          openid: userStore.openid,
        }
        atUserPhoneLock.value = true
        uni.showLoading({ title: '获取信息...' })
        userLoginApi(param).then((res) => {
          closePopup()
          uni.hideLoading()
          if (res) {
            userStore.userInfo = res
            userStore.token = res.token
            authStore.pushAuth('user')
            atUserInfoLock.value = false
            if (userStore.userInfo.phone && userStore.userInfo.phone.length >= 11) {
              return
            }
            changePopup(true)
          } else {
            if (userStore.openid) {
              uni.showToast({ title: '获取不到openid!', icon: 'none' })
              initInfo()
            }
            uni.showToast({ title: '用户授权失败!', icon: 'none' })
          }
        })
      },
      fail: (e) => {
        atUserInfoLock.value = false
        uni.showToast({ title: ~e.errMsg.indexOf('fail auth deny') ? '授权被拒绝!' : '授权失败!', icon: 'none' })
      },
    })
  } else {
    uni.showModal({
      title: '系统提示',
      content: '小程序版本太低!',
      showCancel: false,
    })
  }
}

const getPhoneNumber = (e) => {
  if (atUserPhoneLock.value) return
  console.log('getPhoneNumber e', e)
  if (e.detail.errMsg === 'getPhoneNumber:ok') {
    atUserPhoneLock.value = true
    if (!userStore.token) {
      userStore.userLogin().then(() => {
        bindPhoneNumber(e)
      })
    } else {
      bindPhoneNumber(e)
    }
  } else {
    atUserPhoneLock.value = false
    uni.showToast({ title: '授权被拒绝!', icon: 'none' })
  }
}

const bindPhoneNumber = (e) => {
  uni.showLoading({ title: '绑定手机号...' })
  const { encryptedData, iv, signature } = e.detail
  bindPhoneApi({ encryptedData, iv, signature }).then((res) => {
    closePopup()
    uni.hideLoading()
    atUserPhoneLock.value = false
    if (res) {
      userStore.userInfo = res
    } else {
      uni.showToast({ title: '绑定手机失败,请重新登陆绑定!', icon: 'none' })
    }
  })
}

const onAuthError = (e) => {
  uni.showToast({ title: e.detail.errorMessage, icon: 'none' })
}
</script>
