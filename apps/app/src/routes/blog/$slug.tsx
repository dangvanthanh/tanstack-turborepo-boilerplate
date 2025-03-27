import { MDXContent } from '@content-collections/mdx/react'
import { createFileRoute, Link, redirect } from '@tanstack/react-router'
import { allPosts } from 'content-collections'
import { css } from 'styled-system/css'
import { flex } from 'styled-system/patterns'
import { seo } from '~/lib'

export const Route = createFileRoute('/blog/$slug')({
	component: RouteComponent,
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

function RouteComponent() {
	const { post } = Route.useLoaderData()

	return (
		<div
			className={css({
				maxW: '2xl',
				mx: 'auto',
				px: { base: 4, md: 6, lg: 8 },
			})}
		>
			<div className={css({ py: 12 })}>
				<Link
					to="/blog"
					className={flex({
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
						strokeWidth="1.5"
						stroke="currentColor"
						className={css({ w: 4, h: 4 })}
					>
						<title>Chevron Left</title>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M15.75 19.5 8.25 12l7.5-7.5"
						/>
					</svg>
					<span>Back to Blog</span>
				</Link>
				<h1
					className={css({
						fontSize: '3xl',
						fontWeight: 600,
						lineHeight: 'tight',
						my: 2,
					})}
				>
					{post.title}
				</h1>
				<div
					className={css({
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
				>
					<MDXContent code={post.mdx} />
				</div>
			</div>
		</div>
	)
}
