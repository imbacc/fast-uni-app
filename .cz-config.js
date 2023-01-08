'use strict'
module.exports = {
  types: [
    { value: "feat", name: "✨feat: 新的内容" },
    { value: "update", name: "🎠update: 更新内容" },
    { value: "fix", name: "🐛fix: 修复Bug" },
    { value: "perf", name: "⚡️perf: 优化,提升性能" },
    { value: "types", name: "⚓types: 类型定义" },
    { value: "test", name: "✅test: 测试" },
    { value: "docs", name: "📝docs: 变更的只有文档" },
    { value: "style", name: "💄style: 代码风格,格式修复" },
    { value: "build", name: "📦build: 变更项目构建或外部依赖" },
    { value: "ci", name: "🔧ci: 变更构建流程或辅助工具" },
    { value: "refactor", name: "♻️refactor: 代码重构，注意和feat、fix区分开" },
    { value: "revert", name: "⏪revert: 代码回退" },
  ],
  scopes: [
    { name: 'vue' },
    { name: 'react' },
    { name: 'typeScript' },
    { name: 'javascript' },
    { name: 'node' },
    { name: 'leetcode' },
    { name: 'other' },
  ],
  // it needs to match the value for field type. Eg.: 'fix'
  /*  scopeOverrides: {
    fix: [
      {name: 'merge'},
      {name: 'style'},
      {name: 'e2eTest'},
      {name: 'unitTest'}
    ]
  },  */
  // override the messages, defaults are as follows
  messages: {
    type: '选择一种你的提交类型:',
    scope: '选择一个scope (可选):',
    // used if allowCustomScopes is true
    customScope: 'Denote the SCOPE of this change:',
    subject: '短说明:\n',
    body: '长说明，使用"|"换行(可选)：\n',
    breaking: '非兼容性说明 (可选):\n',
    footer: '关联关闭的issue，例如：#31, #34(可选):\n',
    confirmCommit: '确定提交说明?(yes/no)'
  },
  allowCustomScopes: true,
  allowBreakingChanges: ["feat", "fix"],
  skipQuestions: ["scope", "body", "breaking", "footer"],
  // limit subject length
  subjectLimit: 100
}