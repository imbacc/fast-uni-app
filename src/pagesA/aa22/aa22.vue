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

onLoad((option) => {
  console.log('%c [ option ]-31', 'font-size:14px; background:#41b883; color:#ffffff;', option)
  option.value = JSON.stringify(option)
})
</script>

<style></style>
