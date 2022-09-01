import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

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
})
