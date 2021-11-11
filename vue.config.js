const webpack = require('webpack')

const env = process.env
console.log('env=', env);

// pages.json 修改了需要重启项目
const readPagesJSON = () => {
	const path = require('path')
	const fs = require('fs')
	const jsonFilePath = path.join(__dirname, './pages.json')
	if (!fs.existsSync(jsonFilePath)) return new Error(jsonFilePath + ' 不存在')
	const json = fs.readFileSync(jsonFilePath, 'utf8')
	// 去除注释
	const reg = /("([^\\\"]*(\\.)?)*")|('([^\\\']*(\\.)?)*')|(\/{2,}.*?(\r|\n|$))|(\/\*(\n|.)*?\*\/)/g;
	return json.replace(reg, (word) => /^\/{2,}/.test(word) || /^\/\*/.test(word) ? "" : word)
}

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
	},
	configureWebpack: {
		plugins: [
			new webpack.DefinePlugin({
				PAGES_JSON: JSON.stringify(readPagesJSON())
			})
		]
	}
}
