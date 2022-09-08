import { createHtmlPlugin } from 'vite-plugin-html'
const env = process.env
const isDev = env.NODE_ENV === 'development'
const path = isDev ? 'assets/inject' : 'assets/inject'

// inject
const title = env.VITE_GLOB_APP_TITLE
// const injectHeader = `<link defer="defer" href="${path}/inject-test.css" />`
// const injectScript = `<script crossorigin defer="defer" type="text/javascript" src="${path}/inject-test.js"></script>`

const injectHeader = ''
const injectScript = ''

export default () => {
  return createHtmlPlugin({
    inject: {
      data: {
        title,
        injectHeader,
        injectScript
      }
    },
    minify: true
  })
}
