import Components from 'unplugin-vue-components/vite'
// import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

// 定义自己的解析器
// const diyResolver = (name) => {
// // where `name` is always CapitalCase
// if (name.startsWith('Van')) return { importName: name.slice(3), path: 'vant' }
// }

// 按需引入组件 + 自动引入组件
export default () => {
  return Components({
    // 用于搜索组件的目录的相对路径。
    dirs: ['src/components'],
    // 组件的有效文件扩展名。
    extensions: ['vue'],
    // 搜索子目录
    deep: true,
    // 自定义组件的解析程序
    // resolvers: [AntDesignVueResolver()],
    // 生成“components.d.ts”全局声明，
    // 还接受自定义文件名的路径
    dts: false,
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
    include: [/\.vue$/, /\.vue\?vue/],
    exclude: [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/, /[\\/]\.nuxt[\\/]/],
  })
}
