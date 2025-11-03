import { defineCollection, defineConfig } from '@content-collections/core'
import { compileMarkdown } from '@content-collections/markdown'
import { z } from 'zod'

const posts = defineCollection({
	name: 'posts',
	directory: './src/content/posts',
	include: '*.md',
	schema: z.object({
		title: z.string(),
		summary: z.string(),
		publishedAt: z.string(),
	}),
	transform: async (document, context) => {
		const html = await compileMarkdown(context, document)
		return {
			...document,
			html,
		}
	},
})

export default defineConfig({
	collections: [posts],
})
