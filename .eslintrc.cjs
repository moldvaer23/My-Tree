module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: 'module',
		warnOnUnsupportedTypeScriptVersion: false,
	},
	settings: {
		react: {
			version: 'detect',
		},
		'import/resolver': {
			alias: {
				map: [
					['@app', 'src/00-app/App.tsx'],
					['@pages', 'src/01-pages'],
					['@widgets', 'src/02-widgets'],
					['@features', 'src/03-features'],
					['@entities', 'src/04-entities'],
					['@assets', 'src/05-shared/assets'],
					['@services', 'src/05-shared/services'],
					['@styles', 'src/05-shared/styles'],
					['@app-types', 'src/05-shared/types'],
					['@ui-kit', 'src/05-shared/ui'],
					['@utils', 'src/05-shared/utils'],
				],
				extensions: ['.ts', '.tsx', '.js', '.jsx'],
			},
		},
	},
	extends: [
		'plugin:@typescript-eslint/recommended',
		'plugin:prettier/recommended',
		'prettier',
		'plugin:react/recommended',
		'plugin:react-hooks/recommended',
		'plugin:import/errors',
		'plugin:import/warnings',
		'plugin:import/typescript',
		'plugin:jsx-a11y/recommended',
		'plugin:eslint-comments/recommended',
	],
	rules: {
		quotes: [2, 'single', { avoidEscape: true }],
		'no-unused-vars': 'off',
		'@typescript-eslint/no-unused-vars': ['error'],
		'@typescript-eslint/no-var-requires': 'off',
		'react/prop-types': 'off',
		'react/jsx-uses-react': 'off',
		'react/react-in-jsx-scope': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'import/no-unresolved': 'off',
	},
}
