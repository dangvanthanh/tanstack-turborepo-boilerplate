import { defineCollection, defineConfig } from '@content-collections/core'
import { compileMDX } from '@content-collections/mdx'
import {
	transformerMetaHighlight,
	transformerMetaWordHighlight,
	transformerNotationDiff,
} from '@shikijs/transformers'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import { z } from 'zod'

const posts = defineCollection({
	name: 'posts',
	directory: 'content/posts',
	include: '*.mdx',
	schema: z.object({
		title: z.string(),
		summary: z.string(),
		publishedAt: z.string().date(),
	}),
	transform: async (document, context) => {
		const mdx = await compileMDX(context, document, {
			remarkPlugins: [remarkGfm],
			rehypePlugins: [
				rehypeSlug,
				[
					rehypePrettyCode,
					{
						theme: 'material-theme-palenight',
						transformers: [
							transformerMetaHighlight(),
							transformerMetaWordHighlight(),
							transformerNotationDiff({
								matchAlgorithm: 'v3',
							}),
						],
						// biome-ignore lint/suspicious/noExplicitAny: any
						onVisitLine(node: any) {
							// Prevent lines from collapsing in `display: grid` mode, and allow empty
							// lines to be copy/pasted
							if (node.children.length === 0) {
								node.children = [{ type: 'text', value: ' ' }]
							}
						},
						// biome-ignore lint/suspicious/noExplicitAny: any
						onVisitHighlightedLine(node: any) {
							node.properties.className.push('line--highlighted')
						},
						// biome-ignore lint/suspicious/noExplicitAny: any
						onVisitHighlightedWord(node: any) {
							node.properties.className = ['word--highlighted']
						},
					},
				],
				[
					rehypeAutolinkHeadings,
					{
						properties: {
							className: ['subheading-anchor'],
							ariaLabel: 'Link to section',
						},
					},
				],
			],
		})

		return {
			...document,
			mdx,
		}
	},
})

export default defineConfig({
	collections: [posts],
})
