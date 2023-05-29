const baseUrl = import.meta.env.VITE_GLOB_API_URL

// 上传图片
export const uploadApi = (filePath: string) => {
  return new Promise((resolve) => {
    uni.uploadFile({
      url: `${baseUrl}/api/uploadApi`,
      filePath,
      name: 'file',
      success: (res) => {
        if (res && res.statusCode === 200 && res.data) {
          let data = {}
          try {
            data = JSON.parse(res.data)
          } catch (error) {

          }
          resolve(data)
        } else {
          resolve(false)
        }
      },
      fail: (err) => {
        console.log('%c [ err ]-24', 'font-size:14px; background:red; color:#ffffff;', err)
        resolve(false)
      },
    })
  })
}