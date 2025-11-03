import { createFileRoute, redirect } from '@tanstack/solid-router'
import { allPosts } from 'content-collections'
import { css } from 'styled-system/css'
import { flex } from 'styled-system/patterns'
import { seo } from '~/lib'

export const Route = createFileRoute('/blog_/$slug')({
	component: PostComponent,
	beforeLoad: () => ({
		allPosts,
	}),
	loader: async ({ params, context: { allPosts } }) => {
		const slug = params.slug
		const post = allPosts.find((p) => p._meta.path === slug)

		if (!post) {
			throw redirect({ to: '/blog' })
		}

		return { post }
	},
	head: ({ loaderData }) => ({
		meta: loaderData
			? [
					...seo({
						title: loaderData.post.title,
						description: loaderData.post.summary.slice(0, 160),
					}),
				]
			: [],
	}),
})

function PostComponent() {
	const data = Route.useLoaderData()
	const post = () => data().post

	return (
		<div
			class={css({
				maxW: '2xl',
				mx: 'auto',
				px: { base: 4, md: 6, lg: 8 },
			})}
		>
			<div class={css({ py: 12 })}>
				<a
					href="/blog"
					class={flex({
						align: 'center',
						color: 'neutral.500',
						fontSize: 'sm',
						gap: 1,
					})}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class={css({ w: 4, h: 4 })}
					>
						<title>Chevron Left</title>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M15.75 19.5 8.25 12l7.5-7.5"
						/>
					</svg>
					<span>Back to Blog</span>
				</a>
				<h1
					class={css({
						fontSize: '3xl',
						fontWeight: 600,
						lineHeight: 'tight',
						my: 2,
					})}
				>
					{post().title}
				</h1>
				<div
					class={css({
						'& > * + *': { mt: 4 },
						'& img': {
							w: 'full',
							h: 'auto',
							objectFit: 'contain',
						},
						'& h2': {
							fontSize: '2xl',
							fontWeight: 600,
						},
						'& ul': {
							listStyle: 'disc',
							pl: 4,
						},
						'& ul > li + li': {
							mt: 2,
						},
						'& ol': {
							listStyle: 'decimal',
							pl: 4,
						},
						'& ol > li + li': {
							mt: 2,
						},
					})}
					innerHTML={post().html}
				/>
			</div>
		</div>
	)
}
