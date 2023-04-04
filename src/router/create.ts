import { createRouter } from 'imba-uni-router'

import pages from '@/pages.json'

const router = createRouter(pages as any)

export {
  router,
  pages,
}
