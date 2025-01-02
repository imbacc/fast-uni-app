// 默认pages.json里auth配置
// 额外追加
export default [
  {
    path: '/pages/index/fff',
    meta: {
      auth: ['fff'],
    },
  },
  {
    path: '/pagesA/aa/aa',
    meta: {
      auth: ['aa', 'aa'],
    },
  },
  {
    path: '/pagesA/aa22/aa22',
    meta: {
      auth: ['aa22'],
    },
  },
  {
    path: '/pagesB/bb/bb',
    meta: {
      auth: ['aa22', 'bb'],
    },
  },
]
