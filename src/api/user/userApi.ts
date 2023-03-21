import type { bindPhone_PARAMS, userLogin_PARAMS } from '#/api/user'

import http from '@/api/request'

export const API: API_DTYPE = {
  userLogin: ['/app/api/login/wxmini', 'GET'],
  getUserinfo: ['/app/api/login/wx/code/:id', 'GET'],
  bindPhone: ['/app/api/login/wx/bindPhone', 'POST'],
}

export const userLogin = (params: userLogin_PARAMS) => http.request(API.userLogin, { _param: params })

export const getUserinfo = (id: string) => http.request(API.getUserinfo, { _id: id, _noToken: true })

export const bindPhone = (body: bindPhone_PARAMS) => http.request(API.bindPhone, { _body: body })
