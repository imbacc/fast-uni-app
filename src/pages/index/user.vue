<template>
  <view>
    电话胖别 穿新的球鞋上街

    <uv-upload :fileList="fileList" name="1" :maxCount="3" @afterRead="selectUpload" @delete="deletePic"></uv-upload>
  </view>
</template>

<script setup lang="ts">
import { formatFileList } from '@/utils/formatFileList'

const fileList = ref<any[]>([])

onMounted(() => {
  const pngStr = 'https://a.com/1.png,https://a.com/2.png'
  fileList.value = formatFileList(pngStr.includes(',') ? pngStr.split(',') : [pngStr])
})

const selectUpload = (e) => {
  uni.showLoading({ title: '正在上传...', mask: true })
  const list: any[] = []
  e.tempFilePaths.forEach((url) => {
    list.push(new Promise((resolve) => {
      uploadApi(url).then((r: any) => {
        resolve(r?.code === 200 && r?.data?.url ? r.data.url : '')
      })
    }),
    )
  })

  Promise.allSettled(list).then((res) => {
    if (res) {
      res.forEach((item) => {
        if (item.status === 'fulfilled' && item.value) {
          fileList.value.push(...formatFileList([item.value]))
        }
      })
      changeCommitment()
    }
    uni.hideLoading()
  })
}

const changeCommitment = () => {
  const urlJoin = Array.from(fileList.value, ({ url }) => url)
  console.log('%c [ urlJoin ]-54', 'font-size:14px; background:#41b883; color:#ffffff;', urlJoin)
  // xxxxApi(urlJoin.length > 0 ? urlJoin.join(',') : '').then((res) => {
  //   if (res) {
  //     uni.showToast({ title: '更新成功!', icon: 'success' })
  //   } else {
  //     uni.showToast({ title: '更新失败!', icon: 'error' })
  //   }
  //   uni.$emit('homeInit')
  // })
}

const fileDelete = (e) => {
  const idx = fileList.value.findIndex((f) => f.url === e.tempFilePath)
  if (idx !== -1) {
    fileList.value.splice(idx, 1)
  }
  changeCommitment()
}

const deletePic = (event) => {
}
</script>

<style></style>
