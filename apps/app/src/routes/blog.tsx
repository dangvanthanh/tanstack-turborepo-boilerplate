import { createFileRoute, Link } from '@tanstack/solid-router'
import { css } from 'styled-system/css'
import { formatDate, sortedPosts } from '~/lib'

export const Route = createFileRoute('/blog')({
	loader: async () => sortedPosts,
	component: BlogComponent,
})

function BlogComponent() {
	const posts = Route.useLoaderData()

	return (
		<div
			class={css({
				maxW: '3xl',
				mx: 'auto',
				px: { base: 4, md: 6, lg: 8 },
			})}
		>
			<div
				class={css({
					py: 12,
					borderBottomWidth: 1,
					borderColor: 'neutral.200',
				})}
			>
				<h1
					class={css({
						fontSize: '4xl',
						fontWeight: 900,
						lineHeight: 'tight',
					})}
				>
					From the blog
				</h1>
				<p class={css({ mt: 2, color: 'neutral.600' })}>
					Discover expert tips to grow your business!
				</p>
			</div>
			<ul class={css({ spaceY: 12, my: 12 })}>
				{[...posts()].map((post) => (
					<li>
						<time class={css({ color: 'neutral.500' })}>
							{formatDate(post.publishedAt)}
						</time>
						<h3 class={css({ fontSize: 'lg', fontWeight: 600, my: 2 })}>
							<Link
								to="/blog/$slug"
								params={{
									slug: post._meta.path,
								}}
								class={css({
									color: 'neutral.700',
									_hover: { color: 'neutral.500' },
								})}
							>
								{post.title}
							</Link>
						</h3>
						<div class={css({ color: 'neutral.700' })}>{post.summary}</div>
					</li>
				))}
			</ul>
		</div>
	)
}
