import type { METHOD_DTYPE, Inject_DTYPE, RequestConfig_DTYPE } from 'imba-uni-request/dist/types/imba-uni-request'

import http from '@/api/request'

export const sendCodeHooks = (
  apiUrl: string | [string, METHOD_DTYPE] | [string, METHOD_DTYPE, number],
  inject?: Inject_DTYPE,
  options?: Partial<RequestConfig_DTYPE>,
) => {
  let time = 0
  let lock = false
  let text = '获取验证码'
  console.log('%c [ text ]-13', 'font-size:14px; background:#41b883; color:#ffffff;', text)

  const testTel = (phone: string) => {
    return /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1589]))\d{8}$/.test(
      phone,
    )
  }

  const refushCode = () => {
    const t = setInterval(() => {
      if (time <= 0) {
        clearInterval(t)
        lock = false
        text = '重新获取'
      } else {
        time = time -= 1
        text = `已发送(${time}s)`
      }
    }, 1000)
  }

  const getCode = (phone: string) => {
    if (lock) return
    if (!testTel(phone)) {
      console.error('不是有效的手机号码!')
      return
    }

    text = '正在发送...'
    lock = true
    http.request(apiUrl, inject, options).then((res) => {
      if (res) {
        time = 120
        lock = true
        refushCode()
      } else {
        lock = false
        text = '重新发送'
      }
    })
  }

  return {
    getCode,
    refushCode,
  }
}
