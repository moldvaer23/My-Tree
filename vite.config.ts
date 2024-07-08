/* TODO: Исправить баг eslint */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		port: 3000,
	},
	build: {
		sourcemap: true,
	},
	resolve: {
		alias: {
			'@app': path.resolve(__dirname, 'src/app/App.tsx'),
			'@assets': path.resolve(__dirname, 'src/assets'),
			'@components': path.resolve(__dirname, 'src/components'),
			'@pages': path.resolve(__dirname, 'src/pages'),
			'@services': path.resolve(__dirname, 'src/services'),
			'@utils': path.resolve(__dirname, 'src/utils'),
			'@configs': path.resolve(__dirname, 'src/configs'),
		},
	},
})
