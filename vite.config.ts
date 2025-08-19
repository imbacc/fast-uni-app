import type { UserConfig } from 'vite'
import type { ENV_DTYPE } from './types/vite-plugin/auto-env'

import process from 'node:process'
import { resolve } from 'node:path'
import { loadEnv, defineConfig } from 'vite'
import { viteMockServe } from 'vite-plugin-mock'

// plugin
import envPlugin, { formatEnv } from './vite-plugin/vite-plugin-env'
// uni-app
import uni from '@dcloudio/vite-plugin-uni'
// tsx写法
// import vueTsx from '@vitejs/plugin-vue-jsx'
// Unocss
// import Unocss from 'unocss/vite'
// auto import api
import autoImportPlugin from './vite-plugin/vite-plugin-auto-import'
// auto components
import componentsPlugin from './vite-plugin/vite-plugin-auto-components'
// html inject
import htmlInjectPlugin from './vite-plugin/vite-plugin-htmlInject'
// 使用gzip或brotli来压缩资源
// import compressionPlugin from 'vite-plugin-compression'

// 基于文件名 (*.<h5|mp-weixin|app>.*) 的按平台编译插件 index.h5.vue -> h5平台
import platform from '@uni-helper/vite-plugin-uni-platform'

import packageJson from './package.json'
import dayjs from 'dayjs'

const { dependencies, name, version } = packageJson
const __APP_INFO__ = {
  package: {
    name,
    version,
    // dependencies,
  },
  lastBuildTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
}

// https://vitejs.dev/config/
const config: UserConfig = {
  // 编译
  build: {
    // minify: 'esbuild',
    target: 'modules',
    cssCodeSplit: true,
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    chunkSizeWarningLimit: 500,
    assetsInlineLimit: 4096,
    rollupOptions: {
      // output: {
      //   // chunks 做操作 注释将减少分割
      //   manualChunks: {
      //     // 'vue': ['vue', 'vue-i18n'],
      //     'imba-libs': ['imba-uni-cache', 'imba-uni-request', 'imba-uni-router'],
      //     'lodash-es': ['lodash-es'],
      //   },
      // },
    },
  },

  // 部门优化选项
  optimizeDeps: {
    // exclude: ['lodash-es'],
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

  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        silenceDeprecations: ['legacy-js-api'],
      },
    },
  },

  // 插件
  plugins: [
    platform(),
    uni(),
    autoImportPlugin(),
    componentsPlugin(),
    componentsPlugin(),
  ],
}

export default defineConfig(async ({ command, mode }) => {
  const Unocss = (await import('unocss/vite')).default
  const VITE_ENV = formatEnv(loadEnv(mode, process.cwd())) as ENV_DTYPE
  const { VITE_APP_TITLE, VITE_USE_MOCK, VITE_BUILD_GZIP } = VITE_ENV
  console.log('command=', command)
  console.log('mode=', mode)

  config.plugins?.push(Unocss())
  config.plugins?.push(envPlugin(VITE_ENV))
  config.plugins?.push(htmlInjectPlugin(VITE_APP_TITLE))

  if (command === 'build' && mode === 'production') {
    // 编译环境配置
    if (VITE_BUILD_GZIP) {
      // config.plugins?.push(compressionPlugin({
      //   verbose: true,
      //   algorithm: 'gzip',
      //   ext: '.gz',
      // }))
    }
  } else {
    if (config.build) {
      config.build.sourcemap = true
    }

    // 开发环境配置
    if (VITE_USE_MOCK) {
      const mockPlugins = viteMockServe({ mockPath: 'mock' })
      if (!config.plugins?.includes(mockPlugins)) {
        config.plugins?.push(mockPlugins)
      }
    }
  }
  return config
})
