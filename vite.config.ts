import { resolve } from 'path'

import uni from '@dcloudio/vite-plugin-uni'

// plugin
import { VITE_USE_MOCK, VITE_BUILD_GZIP } from './src/config/cfg'
import { viteMockServe } from 'vite-plugin-mock' // mock
import gzipPlugin from 'rollup-plugin-gzip' // Gzip
import windicssPlugin from 'vite-plugin-windicss' // windicss
import compressionPlugin from 'vite-plugin-compression' // 使用gzip或brotli来压缩资源
import componentsPlugin from './vite-plugin/vite-plugin-components.js' // Vite 的按需组件自动导入
import htmlInjectPlugin from './vite-plugin/vite-plugin-htmlInject.js' // html inject
import vitePluginRouterJson from './vite-plugin/vite-plugin-routerJson.js'

// https://vitejs.dev/config/
const config = {
  server: {
    // minify: 'esbuild',
    // open: '/',
    hmr: { overlay: false },
  },

  // 输出路径
  outDir: 'dist',

  // 编译
  build: {
    target: 'modules',
    cssCodeSplit: true,
    outDir: 'dist',
    assetsDir: 'assets',
    // 生成生产map
    sourcemap: true,
    // 关闭brotliSize显示可以稍微缩短打包时间
    brotliSize: true,
    // chunk 大小警告的限制
    chunkSizeWarningLimit: 500,
    // 小于此数字（以字节为单位）的静态资产文件将内联为 base64字符串。默认限制为“4096”（4kb）。设置为“0”以禁用。
    assetsInlineLimit: 4096,
    // 是否对CSS进行代码拆分。启用时，异步块中的CSS将在块中作为字符串内联，并通过动态创建的加载块时的样式标记。
    // 打包引入 输出
    rollupOptions: {
      format: 'commonjs',
      // external: ['vue'],
      output: {
        // chunks 做操作 注释将减少分割
        manualChunks(id) {
          if (id.includes('node_modules')) {
            const str = id.toString()

            try {
              if (str.indexOf('ant-design')) {
                return 'ant-design'
              }

              if (str.indexOf('registry.npmmirror.com+')) {
                return str.split('registry.npmmirror.com+')[1].split('/node_modules')[0].toString()
              }

              if (str.indexOf('registry.nlark.com+')) {
                return str.split('registry.nlark.com+')[1].split('/node_modules')[0].toString()
              }
            } catch (error) {
              console.error('id error', error)
            }

            return 'node_modules'
          }
        },
      },
    },
  },

  // 部门优化选项
  optimizeDeps: {
    entries: ['vue', 'nprogress', 'vue-router', 'axios'],
    // include: [],
    // exclude: ['screenfull', 'nprogress']
  },

  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },

  // 插件
  plugins: [uni(), componentsPlugin(), windicssPlugin(), htmlInjectPlugin(), vitePluginRouterJson()],

  // 要将一些共享的全局变量传递给所有的scss样式
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "@/styles/theme.scss" as *;',
      },
    },
  },
}

export default ({ command, mode }) => {
  // const { VITE_USE_MOCK, VITE_BUILD_GZIP } = process.env
  console.log('command=', command)
  console.log('mode=', mode)
  if (command === 'build' && mode === 'production') {
    // 编译环境配置
    // Gzip
    if (VITE_BUILD_GZIP) config.plugins.push(gzipPlugin())
    config.plugins.push(compressionPlugin())
  } else {
    // 开发环境配置
    // vite-plugin-mock
    if (VITE_USE_MOCK) config.plugins.push(viteMockServe({ mockPath: 'mock', supportTs: false }))
  }
  return config
}
