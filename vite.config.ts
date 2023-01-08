import type { PluginOption, UserConfig } from 'vite'

import { resolve } from 'path'
import uni from '@dcloudio/vite-plugin-uni'

// plugin
import { VITE_USE_MOCK, VITE_BUILD_GZIP } from './src/config/cfg'
import { viteMockServe } from 'vite-plugin-mock' // mock
import gzipPlugin from 'rollup-plugin-gzip' // Gzip
import windicssPlugin from 'vite-plugin-windicss' // windicss
import compressionPlugin from 'vite-plugin-compression' // 使用gzip或brotli来压缩资源
import componentsPlugin from './vite-plugin/vite-plugin-components' // Vite 的按需组件自动导入
import htmlInjectPlugin from './vite-plugin/vite-plugin-htmlInject' // html inject
import vitePluginRouterJson from './vite-plugin/vite-plugin-routerJson'

// https://vitejs.dev/config/
const config: UserConfig = {
  // 编译
  build: {
    minify: 'esbuild',
    target: 'modules',
    cssCodeSplit: true,
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    brotliSize: true,
    chunkSizeWarningLimit: 500,
    assetsInlineLimit: 4096,
    rollupOptions: {
      output: {
        // chunks 做操作 注释将减少分割
        manualChunks: {
          'vue': ['vue', 'vue-i18n'],
          'imba-libs': ['imba-cache', 'imba-uni-request', 'imba-uni-router'],
          'lodash-es': ['lodash-es'],
        },
      },
    },
  },

  // 部门优化选项
  optimizeDeps: {
    exclude: ['lodash-es'],
  },

  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '#': resolve(__dirname, 'types'),
    },
  },

  // 插件
  plugins: [uni(), componentsPlugin(), windicssPlugin(), htmlInjectPlugin(), vitePluginRouterJson() as PluginOption],

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
    if (VITE_BUILD_GZIP) config.plugins?.push(gzipPlugin() as PluginOption)
    config.plugins?.push(compressionPlugin())
  } else {
    // 开发环境配置
    // vite-plugin-mock
    if (VITE_USE_MOCK) config.plugins?.push(viteMockServe({ mockPath: 'mock', supportTs: false }))
  }
  return config
}
