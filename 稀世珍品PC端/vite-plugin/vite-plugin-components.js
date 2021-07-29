import ViteComponents from 'vite-plugin-components'
import { ViteIconsResolver } from 'vite-plugin-icons'

// 定义自己的解析器
// const diyResolver = (name) => {
// 	// where `name` is always CapitalCase
// 	if (name.startsWith('Van')) return { importName: name.slice(3), path: 'vant' }
// }

// 按需引入组件 + 自动引入组件
export default () => {
	return ViteComponents({
		dirs: ['src/components'], // 搜索路径
		customComponentResolvers: [ViteIconsResolver()], // 解析器 -> element plus ui解析
		extensions: ['vue'], // 组件的有效文件扩展名。
		deep: false // 搜索子目录
	})
}
