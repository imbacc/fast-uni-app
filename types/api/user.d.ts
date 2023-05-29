export interface userLogin_PARAMS extends bindPhone_PARAMS {
  // 用户openid
  openid: string
}

export interface bindPhone_PARAMS {
  encryptedData: any
  iv: any
  signature: any
}
