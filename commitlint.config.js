module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      ['feat', 'update', 'fix', 'perf', 'types', 'test', 'docs', 'style', 'build', 'ci', 'refactor', 'revert'],
    ],
  },
}
