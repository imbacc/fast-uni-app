import replace from '@rollup/plugin-replace'
import { join } from 'path'
import { existsSync, readFileSync } from 'fs'

// pages.json 修改了需要重启项目
const readPagesJSON = () => {
	const jsonFilePath = join(__dirname, '../src/pages.json')
	if (!existsSync(jsonFilePath)) return new Error(jsonFilePath + ' 不存在')
	const json = readFileSync(jsonFilePath, 'utf8')
	// 去除注释
	const reg = /("([^\\\"]*(\\.)?)*")|('([^\\\']*(\\.)?)*')|(\/{2,}.*?(\r|\n|$))|(\/\*(\n|.)*?\*\/)/g
	return json.replace(reg, (word) => (/^\/{2,}/.test(word) || /^\/\*/.test(word) ? '' : word))
}

export default () => {
	return replace({
		include: ['src/router/index'],
		pages_JSON: JSON.stringify(readPagesJSON()),
		preventAssignment: true
	})
}
