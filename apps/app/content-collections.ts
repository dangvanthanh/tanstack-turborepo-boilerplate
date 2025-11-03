import { defineCollection, defineConfig } from '@content-collections/core'

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
})

export default defineConfig({
	collections: [posts],
})
