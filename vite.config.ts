/* TODO: Исправить баг eslint */
import path from 'path'
import { defineConfig } from 'vite'
import { checker } from 'vite-plugin-checker'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		checker({
			overlay: true,
			typescript: {
				tsconfigPath: './tsconfig.app.json',
			},
		}),
	],
	server: {
		port: 3000,
	},
	build: {
		sourcemap: true,
	},
	resolve: {
		alias: {
			/* Глобальные пути */
			'@app': path.resolve(__dirname, 'src/00-app/App.tsx'),
			'@pages': path.resolve(__dirname, 'src/01-pages'),
			'@widgets': path.resolve(__dirname, 'src/02-widgets'),
			'@features': path.resolve(__dirname, 'src/03-features'),
			'@entities': path.resolve(__dirname, 'src/04-entities'),

			/* Все что внутри shared */
			'@assets': path.resolve(__dirname, 'src/05-shared/assets'),
			'@services': path.resolve(__dirname, 'src/05-shared/services'),
			'@styles': path.resolve(__dirname, 'src/05-shared/styles'),
			'@app-types': path.resolve(__dirname, 'src/05-shared/types'),
			'@ui-kit': path.resolve(__dirname, 'src/05-shared/ui'),
			'@utils': path.resolve(__dirname, 'src/05-shared/utils'),
		},
	},
})
