import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()]
	// css: {
	// 	loaderOptions: {
	// 		less: {
	// 			additionalData: `@import "/src/assets/index.less";`
	// 		}
	// 	}
	// }
})
