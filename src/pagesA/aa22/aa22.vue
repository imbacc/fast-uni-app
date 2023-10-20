<template>
  <view class="">
    aa22子页面
    <view class="">
      option: {{ option }}
    </view>
  </view>
</template>

<script lang="ts" setup>
const option = ref({})

onLoad((options) => {
  console.log('%c [ options ]-31', 'font-size:14px; background:#41b883; color:#ffffff;', options)
  option.value = JSON.stringify(options)
})
</script>

<style></style>
