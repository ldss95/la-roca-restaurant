import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	css: {
		preprocessorOptions:{
		less: {
			modifyVars: {
			'primary-color': '#E64848',
			},
			javascriptEnabled: true,
		},
		},
	},
	resolve: {
		alias: [
			{
				find: /^~/,
				replacement: ''
			},
			{
				find: '@',
				replacement: path.resolve(__dirname, 'src')
			}
		]
	}
})
