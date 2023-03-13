import AutoImport from 'unplugin-auto-import/vite'

export default () => {
  return AutoImport({
    // 会在根目录生成auto-imports.d.ts，里面可以看到自动导入的api
    dts: 'types/vite-plugin/auto-import.d.ts',
    // 匹配的文件，也就是哪些后缀的文件需要自动引入
    include: [/\.[tj]sx?$/, /\.vue$/],
    // 自动引入的api从这里找
    imports: ['vue', 'pinia', 'uni-app'],
    // 自动引入的目录
    dirs: ['src/api/*', 'src/store', 'src/hooks'],
    // 根据项目情况配置eslintrc，默认是不开启的
    eslintrc: {
      enabled: true, // @default false
    },
  })
}
