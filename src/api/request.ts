import { ImbaUniRequest } from 'imba-uni-request'

import { useUserStore } from '@/store/user'

const baseUrl = ''
const pageKey = ''
const sizeKey = ''
// const env = 'development'

const userStore = useUserStore()

const http = new ImbaUniRequest({
  /**
   *  `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
   *  它可以通过设置一个 `baseURL` 便于为实例的方法传递相对 URL
   */
  baseURL: baseUrl,
  /**
   * 超时时间，单位毫秒
   * 默认 30s = 1000 * 30
   */
  timeout: 1000 * 30,
  /**
   * 设置请求的 header，header 中不能设置 Referer。
   * 平台差异说明：App、H5端会自动带上cookie，且H5端不可手动修改
   */
  headers: {},
  /**
   * 缓存&SWR 是否开启
   * 默认 true
   */
  cacheBool: true,
  /**
   * 缓存&SWR 缓存时间 默认分单位 mm
   * 默认 -1
   */
  cacheTime: -1,
  /**
   * 缓存&SWR 缓存单位 mm | ss
   * 默认 mm
   */
  cacheUnit: 'mm',
  /**
   * 是否请求错误后重试
   * 默认 true
   */
  retryBool: true,
  /**
   * 请求重试错误次数
   * 默认 2
   */
  retryCount: 1,
  /**
   * 重试内时间定位 单位秒
   * 默认 5
   */
  retryInterval: 3,
  /**
   * 分页字段设置
   */
  pageKey,
  sizeKey,
  /**
   * 打印API接口地址是否MD5化
   */
  printMD5: false,
  /**
   * 是否开启打印请求数据
   */
  printConsole: true,
})

let errorTime
const errorMsg = (title: string) => {
  clearTimeout(errorTime)
  errorTime = setTimeout(() => {
    clearTimeout(errorTime)
    uni.showToast({ title, icon: 'none', mask: false, duration: 2000 })
  }, 100)
}

const goLogion = () => {
  userStore.logout()
  // uni.reLaunch({ url: '/pages/login/login' })
  uni.$emit('showLoginPopup', true)
}

// 请求拦截
http.interceptors.request.use((config) => {
  const token = userStore.token || false
  if (token) (config.header as any).Authorization = token
  return config
})

// 响应拦截
http.interceptors.response.use((res) => {
  const { statusCode, errMsg } = res

  if (errMsg === 'request:fail') return false

  if (statusCode === 401) {
    console.error('401错误', errMsg)
    errorMsg('登录信息已失效')
    goLogion()
    return false
  }

  if (statusCode === 503) {
    console.error('503错误', errMsg)
    errorMsg('503错误')
    return false
  }

  if (errMsg && (errMsg.toString().includes('fail') || statusCode === 0)) {
    errorMsg('网络异常')
    return false
  }

  const { code, msg, data } = res.data

  if (data.code === 200) {
    console.log('拦截通知:', data.msg)
    if (data.rows) return { ...data }
    if (data.data === null) return true
    return data.data
  } else {
    if (data.code === 401) {
      errorMsg('登录信息已失效')
      goLogion()
      return false
    }

    if (data.msg) errorMsg(data.msg ? data.msg : '服务器打瞌睡了')
    console.error('服务报错:', data.msg)
    return 'false'
  }
})

export default http
