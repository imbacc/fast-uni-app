module.exports = {
	productionSourceMap: false, // 生产打包时不输出map文件，增加打包速度  
	chainWebpack: (config) => {
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

			// config.optimization.runtimeChunk("single")
	}
}
