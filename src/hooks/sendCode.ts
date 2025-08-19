import type { METHOD_DTYPE, Inject_DTYPE, RequestConfig_DTYPE } from 'imba-uni-request/dist/types/imba-uni-request'

import http from '@/api/request'

export const useSendCode = (
  apiUrl: string | [string, METHOD_DTYPE] | [string, METHOD_DTYPE, number],
  inject?: Inject_DTYPE,
  options?: Partial<RequestConfig_DTYPE>,
) => {
  const time = ref(0)
  const lock = ref(false)
  const text = ref('获取验证码')

  const testTel = (phone: string) => {
    return /^(?:(?:\+|00)86)?1(?:3\d|4[5-79]|5[0-35-9]|6[5-7]|7[0-8]|8\d|9[1589])\d{8}$/.test(phone)
  }

  let t
  const refreshCode = () => {
    clearTimer()
    t = setInterval(() => {
      if (time.value <= 0) {
        lock.value = false
        text.value = '重新获取'
      } else {
        time.value = time.value -= 1
        text.value = `已发送(${time.value}s)`
      }
    }, 1000)
  }

  const clearTimer = () => {
    if (t) {
      clearInterval(t)
      t = null
    }
  }

  const getCode = (phone: string) => {
    if (lock.value) return
    if (!testTel(phone)) {
      console.error('不是有效的手机号码!')
      return
    }

    text.value = '正在发送...'
    lock.value = true
    http.request(apiUrl, inject, options).then((res) => {
      if (res) {
        time.value = 120
        lock.value = true
        refreshCode()
      } else {
        lock.value = false
        text.value = '重新发送'
      }
    }).catch((error) => {
      lock.value = false
      text.value = '重新发送'
      console.error('验证码发送失败:', error)
    })
  }

  return {
    text,
    lock,
    time,
    getCode,
    refreshCode,
    clearTimer,
  }
}
