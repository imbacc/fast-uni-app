import { createRouter } from 'imba-uni-router'

import intercept from './intercept'
import convert from './convert'

const createRouterMode = () => {
  return {
    install: () => {
      const router = createRouter(convert())
      intercept(router)
      return router
    },
  }
}

export { createRouterMode }
