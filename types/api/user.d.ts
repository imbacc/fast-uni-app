export interface userLogin_PARAMS {
  // 【默认】0直接进入，1二维码，2链接
  firstAccessType: 0 | 1 | 2
  // 测试test 平台官方platform 短信sms 地推offline 线上online 其他other
  srcType: 'test' | 'platform' | 'sms' | 'offline' | 'online' | 'other'
  // 用户openid
  openid: string
}

export interface bindPhone_PARAMS {
  encryptedData: any
  iv: any
}