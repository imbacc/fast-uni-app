import routerPages from 'vite-plugin-pages'
import { camelCase } from 'lodash-es'

export default () => {
  return routerPages({
    extendRoute(route, _parent) {
      const split = route.path.split('/').filter(f => f)
      const name = split[split.length - 1]
      route.name = camelCase(name)
      route.path = `/${name}`
      if (~name.indexOf('-')) {
        route = null
        _parent = null
        return null
      }
      return route
    },
    pagesDir: 'src/views/service',
    extensions: ['vue'],
  })
}
