import routerPages from 'vite-plugin-pages'
import { camelCase } from 'change-case'

// 案例文件夹格式
// src/pages/users/[id].vue -> /users/:id (/users/one)
// src/pages/[user]/settings.vue -> /:user/settings (/one/settings)
// 可在页面追加
// <route>
// {
//   name: "name-override",
//   meta: {
//     requiresAuth: false
//   }
// }
// < /route>
export default () => {
  return routerPages({
    extendRoute(route, parent) {
      route.name = `${route.name}`.includes('-') ? camelCase(route.name) : route.name
      return route
    },
    dirs: [
      { dir: 'src/pages', baseRoute: '' },
      { dir: 'src/pagesA', baseRoute: '' },
      { dir: 'src/pagesB', baseRoute: '' },
    ],
    pagesDir: ['src/pages', 'src/pagesA', 'src/pagesB'],
    extensions: ['vue'],
  })
}
