<template>
  <view class="">
    aa子页面
    <view class="">
      option: {{ option }}
    </view>
    <view class="mt20">
      pages.json 定义信息嵌入当前路由-> {{ router.curRouter }}
    </view>
  </view>
</template>

<script lang="ts" setup>
import { useRouter } from 'imba-uni-router'

const router = useRouter()

const option = ref({})

onLoad((option) => {
  option.value = JSON.stringify(option)
})
</script>

<style></style>
