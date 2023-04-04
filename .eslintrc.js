const { eslintConfig } = require('imba-config')
eslintConfig.rules = Object.assign(eslintConfig.rules, {
  'antfu/top-level-function': 'off',
})
module.exports = eslintConfig