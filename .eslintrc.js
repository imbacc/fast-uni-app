module.exports = {
  root: true,
  extends: ['@antfu'],
  rules: {
    // 未使用变量或者值
    'no-unused-vars': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn',
    // if换行
    'curly': 'off',
    'antfu/if-newline': 'off',
    // else换行
    'brace-style': ['error', '1tbs'],
    '@typescript-eslint/brace-style': 'off',
    // 导出名称按字母排序
    'sort-imports': 'off',
    'import/order': 'off',
    // json名称按字母排序
    'jsonc/sort-keys': 'off',
    // 不限制console.log
    'no-console': 'off',
    // vue template script style标签顺序
    'vue/component-tags-order': ['error', {
      order: [['script', 'template'], 'style'],
    }],
    // 可导出可变let
    'import/no-mutable-exports': 'off',
  },
}
