import type { CacheEnv, Header_DTYPE } from 'imba-uni-request/dist/types/imba-uni-request'

import { UniRequest } from 'imba-uni-request'
import { useUserStore } from '@/store/user'
import { baseUrl, pageKey, sizeKey, env } from '@/config/cfg'

const userStore = useUserStore()

const http = new UniRequest({
  /**
   *  `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
   *  它可以通过设置一个 `baseURL` 便于为实例的方法传递相对 URL
   */
  baseURL: baseUrl,
  /**
   * 超时时间，单位毫秒
   * 默认 30s = 1000 * 30
   */
  timeOut: 1000 * 30,
  /**
   * 设置请求的 header，header 中不能设置 Referer。
   * 平台差异说明：App、H5端会自动带上cookie，且H5端不可手动修改
   */
  headers: {},
  /**
   * 缓存&SWR环境 'development' | 'production' | 'dev' | 'prod'
   * 默认 dev
   */
  cacheEnv: env as CacheEnv,
  /**
   * 缓存&SWR 是否开启
   * 默认 true
   */
  cacheBool: true,
  /**
   * 缓存&SWR 缓存时间 默认分单位 mm
   * 默认 -1
   */
  cacheTime: 1,
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
  retryCount: 2,
  /**
   * 重试内时间定位 单位秒
   * 默认 5
   */
  retryInterval: 5,
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

let errorTime: any = null
const errorMsg = (title: string) => {
  clearTimeout(errorTime)
  errorTime = setTimeout(() => {
    clearTimeout(errorTime)
    uni.showToast({ title, icon: 'none', mask: false, duration: 2000 })
  }, 100)
}

const goLogion = () => {
  uni.removeStorage({ key: 'token' })
  uni.reLaunch({ url: '/pages/login/login' })
}

// 请求拦截
http.interceptors.request.use((config) => {
  const token = userStore.token
  if (token) (config.header as Header_DTYPE)['x-access-token'] = token
  return config
})

// 响应拦截
http.interceptors.response.use((res) => {
  const { statusCode, errMsg } = res

  if (errMsg === 'request:fail') {
    return false
  }

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

  if (errMsg?.toString().indexOf('fail') !== -1 || statusCode === 0) {
    console.error('网络异常:', errMsg)
    errorMsg('网络异常')
    return false
  }

  const { code, msg, data } = res?.data

  if (code === 0) {
    console.log('拦截通知:', msg)
    return data
  } else {
    if (msg) errorMsg(msg || '服务器打瞌睡了')
    console.error('服务报错:', msg)
    return false
  }
})

export default http
