import type { bindPhone_PARAMS, userLogin_PARAMS } from '#/api/user'

import http from '@/api/request'

// 根据code获取解析用户信息
export const getUserinfoApi = (code: string) => http.request(['/app/api/login/wxmini', 'GET'], { _id: code, _noToken: true })
// 根据opneid获取用户信息
export const userLoginApi = (params: userLogin_PARAMS) => http.request(['/app/api/login/wx/code/:id', 'GET'], { _param: params })
// 根据iv数据绑定手机号
export const bindPhoneApi = (body: bindPhone_PARAMS) => http.request(['/app/api/login/wx/bindPhone', 'POST'], { _body: body })
