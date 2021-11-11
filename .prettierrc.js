module.exports = {
	printWidth: 130, // 单行输出（不折行）的（最大）长度
	tabs: true, // 使用制表符 (tab) 缩进行而不是空格 (space)。
	semi: false, // 是否在语句末尾打印分号
	singleQuote: true, // 是否使用单引号
	vueIndentScriptAndStyle: true,
	bracketSpacing: true, // 是否在对象属性添加空格
	htmlWhitespaceSensitivity: 'ignore', // 指定 HTML 文件的全局空白区域敏感度, "ignore" - 空格被认为是不敏感的
	trailingComma: 'none', // 去除对象最末尾元素跟随的逗号
	useTabs: true, // 不使用缩进符，而使用空格
	arrowParens: 'always', // 箭头函数，只有一个参数的时候，也需要括号
	rangeStart: 0, // 每个文件格式化的范围是文件的全部内容
	proseWrap: 'never', // 当超出print width（上面有这个参数）时就折行
	endOfLine: 'auto' // 换行符使用 lf
}
