<script setup lang="ts">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'
onLaunch(() => {
  useUserStore().userLogin()
  useVersionStore().checkVersion()
  console.log('App Launch')
})
onShow(() => {
  console.log('App Show')
})
onHide(() => {
  console.log('App Hide')
})
</script>

<style>
html,
body,
page,
#app {
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
}

.red1 {
  border: 1rpx solid red;
}
</style>
