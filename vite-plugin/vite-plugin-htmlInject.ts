import { createHtmlPlugin } from 'vite-plugin-html'

const path = '.'
export default (title: string) => {
  const injectHeader = `<link defer="defer" href="${path}/inject-test.css" />`
  // const injectScript = `<script crossorigin defer="defer" type="text/javascript" src="${path}/inject-test.js"></script>`
  const injectScript = ''

  return createHtmlPlugin({
    inject: {
      data: {
        title,
        injectHeader,
        injectScript,
      },
    },
    minify: true,
  })
}
