import { fixupConfigRules } from '@eslint/compat'
import reactRefresh from 'eslint-plugin-react-refresh'
import globals from 'globals'
import tsParser from '@typescript-eslint/parser'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all,
})

export default [
	{
		ignores: [
			'node_modules',
			'public',
			'eslint.config.mjs',
			'storybook-static',
			'build',
			'dist',
			'package*.json',
			'*.d.ts',
		],
	},
	...fixupConfigRules(
		compat.extends(
			'eslint:recommended',
			'plugin:@typescript-eslint/recommended',
			'plugin:react-hooks/recommended',
			'plugin:prettier/recommended',
			'prettier',
			'plugin:react/recommended',
			'plugin:import/errors',
			'plugin:import/warnings',
			'plugin:import/typescript',
			'plugin:jsx-a11y/recommended',
			'plugin:eslint-comments/recommended'
		)
	),
	{
		plugins: {
			'react-refresh': reactRefresh,
		},
		languageOptions: {
			globals: {
				...globals.browser,
			},
			parser: tsParser,
			ecmaVersion: 2020,
			sourceType: 'module',
			parserOptions: {
				warnOnUnsupportedTypeScriptVersion: false,
			},
		},
		settings: {
			react: {
				version: 'detect',
			},
			'import/resolver': {
				alias: {
					map: [
						['@app', './src/app/App.tsx'],
						['@assets', './src/assets'],
						['@components', './src/components'],
						['@pages', './src/pages'],
						['@services', './src/services'],
						['@utils', './src/utils'],
						['@configs', './src/configs'],
					],
					extensions: ['.ts', '.tsx', '.js', '.jsx'],
				},
			},
		},
		rules: {
			quotes: [
				2,
				'single',
				{
					avoidEscape: true,
				},
			],
			'react-refresh/only-export-components': [
				'warn',
				{
					allowConstantExport: true,
				},
			],
			'no-unused-vars': 'off',
			'@typescript-eslint/no-unused-vars': ['error'],
			'@typescript-eslint/no-var-requires': 'off',
			'react/prop-types': 'off',
			'react/jsx-uses-react': 'off',
			'react/react-in-jsx-scope': 'off',
			'@typescript-eslint/explicit-module-boundary-types': 'off',
		},
	},
]
