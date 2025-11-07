import { createFileRoute, Link } from '@tanstack/solid-router'
import { css } from 'styled-system/css'
import { formatDate, sortedPosts } from '~/lib'

export const Route = createFileRoute('/')({
	loader: async () => sortedPosts,
	component: Home,
})

function Home() {
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
					Latest Posts
				</h1>
			</div>
			<ul class={css({ spaceY: 6, mt: 6 })}>
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
					</li>
				))}
			</ul>
		</div>
	)
}
