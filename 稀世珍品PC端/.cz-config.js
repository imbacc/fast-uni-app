module.exports = {
	types: [
		{ value: '新增', name: '新增功能' },
		{ value: '修复', name: '修复Bug' },
		{ value: '文档', name: '变更的只有文档' },
		{ value: '其他', name: '其他变更内容' },
		{ value: '重构', name: '代码重构，注意和特性、修复区分开' },
		{ value: '性能', name: '提升性能' },
		{ value: '测试', name: '添加一个测试' },
		{ value: '工具', name: '开发工具变动(构建、脚手架工具等)' },
		{ value: '回滚', name: '代码回退' }
	],

	scopes: [
		['api', 'api相关'],
		['components', '组件相关'],
		['hooks', 'hook相关'],
		['tools', 'tools相关'],
		['styles', '样式相关'],
		['deps', '项目依赖相关'],
		['other', '其他修改相关'],
		// 如果选择 custom，后面会让你再输入一个自定义的 scope。也可以不设置此项，把后面的 allowCustomScopes 设置为 true
		['custom', '以上都不是？我要自定义']
	].map(([value, description]) => {
		return {
			value,
			name: `${value.padEnd(30)} (${description})`
		}
	}),

	// 交互提示信息
	messages: {
		type: '选择一种你的提交类型:',
		scope: '选择一个scope (可选):',
		// 选择 scope: custom 时会出下面的提示
		customScope: '填写简短精炼的变更描述:',
		subject: '短说明:\n',
		body: '长说明，使用"|"换行(可选)：\n',
		breaking: '列举非兼容性的变更 (可选):\n',
		footer: '关联关闭的issue，例如：#31, #34(可选):\n',
		confirmCommit: '确定提交?'
	},

	allowCustomScopes: true,
	allowBreakingChanges: ['新增', '修复'],

	// 跳过要询问的步骤
	// skipQuestions: ['subject', 'body', 'breaking', 'footer'],

	// subject 限制长度
	subjectLimit: 100
}
