<template>
  <view class="">
    bb子页面
    <view class="">
      option: {{ test }}
    </view>
  </view>
</template>

<script lang="ts" setup>
const test = ref<any>({})

onLoad((options) => {
  console.log('%c [ option ]-15', 'font-size:14px; background:#41b883; color:#ffffff;', options)
  test.value = options
})

onShow(() => {
  console.log('%c [ onShow ]-21', 'font-size:14px; background:#41b883; color:#ffffff;')
})
</script>

<style></style>
