const { antfu } = require('@antfu/eslint-config')
const { eslintConfig, ignoresConfig } = require('imba-config')

eslintConfig['vue/html-indent'] = 'off'

module.exports = antfu({
  typescript: true,
  vue: true,

  // Disable jsonc and yaml support
  jsonc: false,
  yaml: false,
  ignores: ignoresConfig,
}, {
  rules: eslintConfig,
  ignores: ignoresConfig,
})
