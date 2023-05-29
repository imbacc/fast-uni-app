import type { bindPhone_PARAMS, userLogin_PARAMS } from '#/api/user'

import http from '@/api/request'

export const API: API_DTYPE = {
  userLogin: ['/app/api/login/wxmini', 'GET'],
  getUserinfo: ['/app/api/login/wx/code/:id', 'GET'],
  bindPhone: ['/app/api/login/wx/bindPhone', 'POST'],
}

// 根据code获取解析用户信息
export const getUserinfoApi = (code: string) => http.request(API.getUserinfo, { _id: code, _noToken: true })
// 根据opneid获取用户信息
export const userLoginApi = (params: userLogin_PARAMS) => http.request(API.userLogin, { _param: params })
// 根据iv数据绑定手机号
export const bindPhoneApi = (body: bindPhone_PARAMS) => http.request(API.bindPhone, { _body: body })
