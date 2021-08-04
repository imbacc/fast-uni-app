import vue from '@vitejs/plugin-vue' // v2.0 核心现在与框架无关。现在通过提供Vue支持@vitejs/plugin-vue
import { resolve } from 'path'

// plugin
import envPlugin from './vite-plugin/vite-plugin-env.js' // env 环境
import gzipPlugin from 'rollup-plugin-gzip' //Gzip
import { viteMockServe } from 'vite-plugin-mock' // mock
import componentsPlugin from './vite-plugin/vite-plugin-components.js' // Vite 的按需组件自动导入
import ViteIcons from 'vite-plugin-icons' // icon 按需引入
// import RemoteAssets from 'vite-plugin-remote-assets' // 远程图片地址转换成本地地址 http://example.com/image.jpg -> /node_modules/.remote-assets/f83j2f.jpg
import windicssPlugin from 'vite-plugin-windicss' // wind css
// import routerPages from 'vite-plugin-pages'	// 自动导入路由 需要可以用
import vitePluginHtmljs from './vite-plugin/vite-plugin-htmljs.js'
import vitePluginCopy from './vite-plugin/vite-plugin-copy.js'

/**
 * @type {import('vite').UserConfig}
 */

const config = {
	server: {
		// port: 3000,
		// host: '127.0.0.1',
		// 压缩
		// minify: 'esbuild'
		// 热更新
		hmr: { overlay: false }
	},

	base: './',

	// 输出路径
	outDir: 'dist',

	//编译
	build: {
		target: 'modules',
		outDir: 'dist',
		assetsDir: 'assets',
		assetsInlineLimit: 4096,
		cssCodeSplit: true,
		sourcemap: false,
		chunkSizeWarningLimit: 1200,

		// 打包引入 输出
		rollupOptions: {
			external: ['assets/hiprint/css/hiprint.css', 'assets/hiprint/css/print-lock.css']
			// 	format: 'commonjs',
			// 	external: ['vue'],
			// 	output: {
			// 		// Provide global variables to use in the UMD build
			// 		// for externalized deps
			// 		globals: {
			// 			vue: 'Vue'
			// 		}
			// 	}
		},
		// 生成生产map
		sourcemap: false,
		// 关闭brotliSize显示可以稍微缩短打包时间
		brotliSize: false,
		chunkSizeWarningLimit: 1200
	},

	//部门优化选项
	optimizeDeps: {
		include: ['nprogress', 'qs-stringify', 'axios'],
		exclude: ['nprogress']
	},

	// 别名包 踏马的npm和yarn不一样
	alias: {
		// v2.0不再需要/开始/结束斜杠。 /@/ -> @
		// '/@': root, vite 内部在用，这里不能用了
		// '/root': __dirname, vite 内部在用，这里不能用了
		'@': resolve(__dirname, 'src'),
		'@assets': resolve(__dirname, 'src/assets'),
		'@components': resolve(__dirname, 'src/components'),
		'@views': resolve(__dirname, 'src/views'),
		'@common': resolve(__dirname, 'src/common'),
		'@styles': resolve(__dirname, 'src/styles')
	},

	// 资源路径
	// assetsDir: 'assets',

	// 小于此数字（以字节为单位）的静态资产文件将内联为 base64字符串。默认限制为“4096”（4kb）。设置为“0”以禁用。
	assetsInlineLimit: 4096,

	//是否对CSS进行代码拆分。启用时，异步块中的CSS将在块中作为字符串内联，并通过动态创建的加载块时的样式标记。
	cssCodeSplit: true,

	// 插件
	plugins: [vue(), envPlugin(), componentsPlugin(), ViteIcons(), windicssPlugin()]

	// cssPreprocessOptions: {
	// 	scss: {
	// 		additionalData: `@import "./src/styles/global.scss";` // 添加公共样式
	// 	}
	// }
}

export default ({ command, mode }) => {
	const { VITE_USE_MOCK, VITE_BUILD_GZIP, VITE_REMOTE_ASSETS } = process.env
	console.log('command=', command)
	console.log('mode=', mode)

	if (command === 'build' && mode === 'production') {
		// 编译环境配置
		// Gzip
		// if (VITE_REMOTE_ASSETS) config.plugins.push(RemoteAssets())
		if (VITE_BUILD_GZIP) config.plugins.push(gzipPlugin())
		config.plugins.push(vitePluginHtmljs())
		// config.plugins.push(vitePluginCopy())
	} else {
		// 开发环境配置
		// vite-plugin-mock
		if (VITE_USE_MOCK) config.plugins.push(viteMockServe({ supportTs: false }))
		config.plugins.push(vitePluginHtmljs())
	}
	return config
}
