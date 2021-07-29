module.exports = {
  // 使用当前配置文件，不再往继续往父级查找
  root: true,
  // 指定启用的环境
  env: {
    browser: true, // 浏览器环境
    node: true,
    es6: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    // parser: 'babel-eslint'
    parser: "@typescript-eslint/parser",
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended' // 使用prettier中的样式规范，且如果使得ESLint会检测prettier的格式问题，同样将格式问题以error的形式抛出. 确保在最后一个.
  ],
  rules: {
    //表示被prettier标记的地方抛出错误信息
    'prettier/prettier': 'error',
    // eslint于vue3.0兼容问题休息
    'vue/no-multiple-template-root': 'off',
    //禁止多余的冒号
    'no-extra-semi': 'warn',
    // 方法名和括号之间的空格数
    'space-before-function-paren': 'off',
    // 不允许出现console语句 不允许出现debugger语句
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    //不允许有声明后未使用的变量或者参数
    'no-unused-vars': ['warn', { vars: 'all', args: 'after-used' }],
    //使用let和const代替var
    'no-var': 'warn',
    //不允许变量重复声明
    'no-redeclare': 'warn',
    //不允许使用隐式eval()
    'no-implied-eval': 'warn',
    //不允许使用eval()
    'no-eval': 'warn'
  },
   // 脚本在执行期间可以访问的全局变量
   globals: {
    AMap: true,
  }
}
