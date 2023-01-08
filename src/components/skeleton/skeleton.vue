<template>
  <view class="tiny-skeleton-ul" style="padding: 24px">
    <view class="tiny-skeleton-li" style="width: 31%" />
    <view class="tiny-skeleton-li" />
    <view class="tiny-skeleton-li" />
    <view class="tiny-skeleton-li" />
    <view class="tiny-skeleton-li" />
    <view class="tiny-skeleton-li" />
    <view class="tiny-skeleton-li" />
    <view class="tiny-skeleton-li" />
    <view class="tiny-skeleton-li" />
    <view class="tiny-skeleton-li" />
    <view class="tiny-skeleton-li" />
    <view class="tiny-skeleton-li" />
    <view class="tiny-skeleton-li" />
    <view class="tiny-skeleton-li" />
    <view class="tiny-skeleton-li" />
    <view class="tiny-skeleton-li" />
    <view class="tiny-skeleton-li" />
    <view class="tiny-skeleton-li" />
    <view class="tiny-skeleton-li" />
    <view class="tiny-skeleton-li" style="width: 61%" />
  </view>
</template>

<style scoped>
.tiny-skeleton-li {
  margin-top: 16px;
  width: 100%;
  height: 16px;
  list-style: none;
  background: #eee;

  animation: loading 0.9s ease infinite;
  background-image: -o-linear-gradient(left, #f0f0f0 25%, #e3e3e3 37%, #f0f0f0 63%);
  background-image: linear-gradient(90deg, #f0f0f0 25%, #e3e3e3 37%, #f0f0f0 63%);
  background-size: 400% 100%;
}

@-webkit-keyframes loading {
  0% {
    background-position: 100% 50%;
  }

  to {
    background-position: 0 50%;
  }
}

@keyframes loading {
  0% {
    background-position: 100% 50%;
  }

  to {
    background-position: 0 50%;
  }
}
</style>
