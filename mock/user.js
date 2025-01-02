// user module 里的测试接口 mock
export default [
  {
    url: '/mock/app/api/login/wx/code',
    method: 'get',
    response: () => {
      return {
        code: 200,
        msg: '操作成功',
        data: {
          id: 1,
          openid: 'openid',
          nickname: '微信用户',
          phone: '13312341234',
          token: 'token',
        },
      }
    },
  },
]
