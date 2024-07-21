module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
	  project: 'tsconfig.json',
	  tsconfigRootDir: __dirname,
	  sourceType: 'module',
	},
	plugins: ['@typescript-eslint/eslint-plugin'],
	extends: ['plugin:@typescript-eslint/recommended'],
	root: true,
	env: {
	  node: true,
	  jest: true,
	},
	ignorePatterns: ['.eslintrc.js'],
	rules: {
	  'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }], // 빈줄 최대 1개
	  'brace-style': [2, '1tbs', { allowSingleLine: true }], // 중괄호 스타일
	  '@typescript-eslint/explicit-module-boundary-types': 0, // 명시적 모듈 바운더리 타입 허용
	  '@typescript-eslint/no-explicit-any': 0, 
	},
      };