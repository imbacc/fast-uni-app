// test_api module 里的测试接口 mock
export default [
  {
    url: '/api/test/get_test',
    method: 'get',
    response: () => {
      return {
        code: 0,
        message: 'ok',
        data: { dd: '我是/api/test/get_test 测试数据' },
      }
    },
  },
  {
    url: '/api/test/get_test/222',
    method: 'get',
    response: () => {
      return {
        code: 0,
        message: 'ok',
        data: { dd: '我是/api/test/get_test/:id 测试数据' },
      }
    },
  },
  {
    url: '/api/test/get_test/three',
    method: 'get',
    response: () => {
      return {
        code: 0,
        message: 'ok',
        data: { dd: '我是/api/test/get_test/three 测试数据' },
      }
    },
  },
]
