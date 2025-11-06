import contentCollections from '@content-collections/vite'
import { tanstackStart } from '@tanstack/solid-start/plugin/vite'
import { nitro } from 'nitro/vite'
import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'
import viteTsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
	plugins: [
		contentCollections(),
		// this is the plugin that enables path aliases
		viteTsConfigPaths({
			projects: ['./tsconfig.json'],
		}),
		tanstackStart(),
		nitro(),
		solidPlugin({ ssr: true }),
	],
})
