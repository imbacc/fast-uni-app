import type { PluginOption, UserConfig } from 'vite'
import type { ENV_DTYPE } from './types/vite-plugin/auto-env'

import { resolve } from 'path'
import { loadEnv, defineConfig } from 'vite'
import { viteMockServe } from 'vite-plugin-mock'

// uni-app
import uni from '@dcloudio/vite-plugin-uni'

// plugin
// import { VITE_USE_MOCK, VITE_BUILD_GZIP } from './src/config/cfg'
// // icon 按需引入
// import IconsPlugin from 'unplugin-icons/vite'
// // 使用gzip或brotli来压缩资源
// import compressionPlugin from 'vite-plugin-compression'
// // tsx写法
// import vueTsx from '@vitejs/plugin-vue-jsx'
// // 原子和属性css写法
// import unocss from '@unocss/vite'

// // env 环境
// import envPlugin, { formatEnv } from './vite-plugin/vite-plugin-env'

// // auto import api
// import autoImportPlugin from './vite-plugin/vite-plugin-auto-import'
// // auto create routerJson
// import vitePluginRouterJson from './vite-plugin/vite-plugin-routerJson'
// // auto import router
// import routerPagePlugin from './vite-plugin/vite-plugin-routerPage'
// // auto components
// import componentsPlugin from './vite-plugin/vite-plugin-components'
// // html inject
// import htmlInjectPlugin from './vite-plugin/vite-plugin-htmlInject'
// // $ref $computed $shallowRef $customRef $toRef $()解构
// import ReactivityTransform from '@vue-macros/reactivity-transform/vite'

// import packageJson from './package.json'
// import dayjs from 'dayjs'

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
          'imba-libs': ['imba-cache', 'imba-uni-request', 'imba-uni-router'],
          'lodash-es': ['lodash-es'],
        },
      },
    },
  },

  // 部门优化选项
  // optimizeDeps: {
  //   exclude: ['lodash-es'],
  // },

  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '#': resolve(__dirname, 'types'),
    },
  },

  // 插件
  plugins: [
    uni(),
    // IconsPlugin(),
    // autoImportPlugin(),
    // componentsPlugin(),
    // routerPagePlugin(),
    // unocss(),
    // vueTsx(),
    // ReactivityTransform(),
    // vitePluginRouterJson() as PluginOption,
  ],

  // 要将一些共享的全局变量传递给所有的scss样式
  // css: {
  //   preprocessorOptions: {
  //     scss: {
  //       additionalData: '@use "@/styles/global.scss" as *;',
  //     },
  //   },
  // },
}

export default defineConfig(({ command, mode }) => {
  // const VITE_ENV = formatEnv(loadEnv(mode, process.cwd())) as ENV_DTYPE
  // const { VITE_GLOB_APP_TITLE, VITE_USE_MOCK, VITE_BUILD_GZIP } = VITE_ENV
  // console.log('command=', command)
  // console.log('mode=', mode)

  // config.plugins?.push(htmlInjectPlugin(VITE_GLOB_APP_TITLE))

  // if (command === 'build' && mode === 'production') {
  //   // 编译环境配置
  //   if (VITE_BUILD_GZIP) {
  //     config.plugins?.push(compressionPlugin({
  //       verbose: true,
  //       algorithm: 'gzip',
  //       ext: '.gz',
  //     }))
  //   }
  // } else {
  //   // 开发环境配置
  //   config.plugins?.push(envPlugin(VITE_ENV))
  //   if (VITE_USE_MOCK) {
  //     config.plugins?.push(viteMockServe({ mockPath: 'mock', supportTs: false }))
  //   }
  // }

  return config
})
