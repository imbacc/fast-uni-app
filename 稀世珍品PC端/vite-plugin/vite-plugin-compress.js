import compress from 'vite-plugin-compress' // 从 Vite 压缩您的捆绑包 + 资产

export default () => {
	return compress({
		quality: 11, // 更高的质量意味着更小的文件大小
		threshold: 1024, // 要压缩的最小文件大小（以字节为单位）
		exclude: [], // 用于从压缩中排除某些文件的
		extensions: [], // 压缩的其他扩展 .html .js .css .svg .json
		brotli: false, // 设置为 false 以禁用 Brotli 压缩。
		verbose: true // 记录压缩文件及其压缩率。
	})
}
