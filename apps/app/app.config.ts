import contentCollections from '@content-collections/vinxi'
import { defineConfig } from '@tanstack/react-start/config'
import tsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
	tsr: {
		appDirectory: 'src',
	},
	server: {
		preset: 'vercel',
	},
	vite: {
		plugins: [
			contentCollections(),
			tsConfigPaths({
				projects: ['./tsconfig.json'],
			}),
		],
	},
})