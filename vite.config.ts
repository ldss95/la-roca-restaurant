import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	build: {
		outDir: 'dist',
		sourcemap: false,
		modulePreload: {
			resolveDependencies: (url, deps, context) => {
				return [];
			}
		},
		rollupOptions: {
			output: {
				sourcemap: false,
				manualChunks: {
					router: ['react-router-dom'],
					nextUi: ['@nextui-org/react'],
					swiper: ['swiper'],
					sentry: ['@sentry/react'],
				}
			}
		}
	},
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
