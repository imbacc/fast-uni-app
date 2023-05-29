import type { UserConfig } from 'vite'
import type { ENV_DTYPE } from './types/vite-plugin/auto-env'

import { resolve } from 'path'
import { loadEnv, defineConfig } from 'vite'
import { viteMockServe } from 'vite-plugin-mock'

// plugin
import envPlugin, { formatEnv } from './vite-plugin/vite-plugin-env'
// uni-app
import uni from '@dcloudio/vite-plugin-uni'
// Unocss
import Unocss from 'unocss/vite'
// auto import api
import autoImportPlugin from './vite-plugin/vite-plugin-auto-import'
// auto components
import componentsPlugin from './vite-plugin/vite-plugin-auto-components'
// html inject
import htmlInjectPlugin from './vite-plugin/vite-plugin-htmlInject'
// 使用gzip或brotli来压缩资源
import compressionPlugin from 'vite-plugin-compression'

import packageJson from './package.json'
import dayjs from 'dayjs'

const { dependencies, name, version } = packageJson
const __APP_INFO__ = {
  package: { dependencies, name, version },
  lastBuildTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
}

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
    chunkSizeWarningLimit: 500,
    assetsInlineLimit: 4096,
    rollupOptions: {
      output: {
        // chunks 做操作 注释将减少分割
        manualChunks: {
          'vue': ['vue', 'vue-i18n'],
          'imba-libs': ['imba-uni-cache', 'imba-uni-request', 'imba-uni-router'],
          'lodash-es': ['lodash-es'],
        },
      },
    },
  },

  // 部门优化选项
  optimizeDeps: {
    exclude: ['lodash-es'],
  },

  define: {
    __APP_INFO__: JSON.stringify(__APP_INFO__),
  },

  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '#': resolve(__dirname, 'types'),
    },
  },

  // 插件
  plugins: [
    uni(),
    autoImportPlugin(),
    componentsPlugin(),
    componentsPlugin(),
    Unocss({
      // 微信等浏览器白屏问题设为true
      // hmrTopLevelAwait: false,
    }),
  ],
}

export default defineConfig(({ command, mode }) => {
  const VITE_ENV = formatEnv(loadEnv(mode, process.cwd())) as ENV_DTYPE
  const { VITE_GLOB_APP_TITLE, VITE_USE_MOCK, VITE_BUILD_GZIP } = VITE_ENV
  console.log('command=', command)
  console.log('mode=', mode)

  config.plugins?.push(htmlInjectPlugin(VITE_GLOB_APP_TITLE))
  config.plugins?.push(envPlugin(VITE_ENV))

  if (command === 'build' && mode === 'production') {
    // 编译环境配置
    if (VITE_BUILD_GZIP) {
      config.plugins?.push(compressionPlugin({
        verbose: true,
        algorithm: 'gzip',
        ext: '.gz',
      }))
    }
  } else {
    // 开发环境配置
    if (VITE_USE_MOCK) {
      config.plugins?.push(viteMockServe({ mockPath: 'mock', supportTs: false }))
    }
  }
  return config
})
