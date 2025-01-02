<template>
  <view class="">
    aa子页面
    <view class="">
      option: {{ option }}
    </view>
    <view class="mt20">
      pages.json 定义信息嵌入当前路由-> {{ router.curRouter }}
    </view>
    <button @click="lastAuth">设置剩余权限</button>
  </view>
</template>

<script lang="ts" setup>
const router = useRouter()
const authStore = useAuthStore()

const option = ref({})

onLoad((options) => {
  option.value = JSON.stringify(options)
})

function lastAuth() {
  authStore.pushRouterAuth(['aa22', 'bb'])
  uni.showToast({ title: '设置成功' })
}
</script>

<style></style>
