const CompressionPlugin = require('compression-webpack-plugin')
const GzipTest = /\.js$|.\css|.\scss|.\sass|.\less/

const path = require("path")
const resolve = dir => path.join(__dirname, dir)
const is_dev = process.env.NODE_ENV === 'development'

module.exports = {
	productionSourceMap: false, // 生产打包时不输出map文件，增加打包速度  
	chainWebpack: (config) => {
		if (!is_dev) {
			// 发行或运行时启用了压缩时会生效
			config.optimization.minimizer('terser').tap((args) => {
				const compress = args[0].terserOptions.compress
				// 非 App 平台移除 console 代码(包含所有 console 方法，如 log,debug,info...)
				compress.drop_console = true
				compress.pure_funcs = [
					'__f__', // App 平台 vue 移除日志代码
					// 'console.debug' // 可移除指定的 console 方法
				]
				return args
			})

			// config.optimization.splitChunks({
			// 	chunks: "all",
			// 	cacheGroups: {
			// 		libs: {
			// 			name: "chunk-modules",
			// 			test: /[\\/]node_modules[\\/]/,
			// 			priority: -10,
			// 			chunks: "initial"
			// 		},
			// 		commons: {
			// 			name: "chunk-commons",
			// 			minSize: 5000,
			// 			test: resolve("src/common"), // can customize your rules
			// 			minChunks: 2, //  minimum common number
			// 			priority: -20,
			// 			reuseExistingChunk: true
			// 		}
			// 	}
			// })

			config.optimization.runtimeChunk("single")
		}
	},
	configureWebpack: (config) => {
		const plugins = []
		if (!is_dev) {
			// plugins.push(
			// 	new CompressionPlugin({
			// 		filename: '[path].gz[query]',
			// 		algorithm: 'gzip',
			// 		test: GzipTest,
			// 		threshold: 10240,
			// 		minRatio: 0.8,
			// 		deleteOriginalAssets: true
			// 	})
			// )
		} else {
			config.devtool = "source-map" // 开发模式下source-map
		}
		
		config.plugins = [...config.plugins, ...plugins]
	}
}
