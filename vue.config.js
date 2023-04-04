// 兼容 app
// 解决 App平台 v3 模式暂不支持在 js 文件中引用"uno.css" 请改在 style 内引用
const UnoCSS = require('unocss-webpack-uniapp2').default
const VueComponents = require('unplugin-vue-components/webpack')
const AutoImport = require('unplugin-auto-import/webpack')

module.exports = {
  configureWebpack: {
    plugins: [
      // https://github.com/unocss/unocss
      UnoCSS(),
      VueComponents({
        // 用于搜索组件的目录的相对路径。
        dirs: ['src/components'],
        // 组件的有效文件扩展名。
        extensions: ['vue'],
        // 搜索子目录
        deep: true,
        // 自定义组件的解析程序
        // 解析器 -> element plus ui解析
        // resolvers: [IconsResolver()],
        // 生成“components.d.ts”全局声明，
        // 还接受自定义文件名的路径
        dts: 'types/vite-plugin/auto-components.d.ts',
        // types: [{ from: 'vue-router', names: ['RouterLink', 'RouterView'] }],
        // 允许子目录作为组件的命名空间前缀。
        directoryAsNamespace: false,
        // 用于忽略命名空间前缀的子目录路径
        // 当`directoryAsNamespace:true时工作`
        globalNamespaces: [],
        // 指令的自动导入
        // 默认值：视图3为“true”，视图2为“false”
        // Babel需要为Vue 2进行转换，出于性能考虑，默认情况下会禁用它。
        // 要安装Babel，请运行：`npm install-D@Babel/parser@Babel/traverse`
        directives: true,
        // 用于变换目标的过滤器
        include: [/\.vue?$/],
        exclude: [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/, /[\\/]\.history[\\/]/],
      }),
      AutoImport({
        // 会在根目录生成auto-imports.d.ts，里面可以看到自动导入的api
        dts: 'types/vite-plugin/auto-import.d.ts',
        // 匹配的文件，也就是哪些后缀的文件需要自动引入
        include: [/\.[tj]sx?$/, /\.vue$/],
        // 自动引入的api从这里找
        imports: [
          'vue',
          {
            'imba-uni-router': ['useRouter', 'useRoute'],
          },
        ],
        // 自动引入的目录
        dirs: ['src/api/*', 'src/store', 'src/hooks'],
        // 根据项目情况配置eslintrc，默认是不开启的
        eslintrc: {
          enabled: true, // @default false
        },
      }),
    ],
  },
}