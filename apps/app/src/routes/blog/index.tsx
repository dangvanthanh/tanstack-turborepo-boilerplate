import { createFileRoute } from '@tanstack/react-router'
import { allPosts } from 'content-collections'
import { css } from 'styled-system/css'
import { formatDate } from '~/lib'

export const Route = createFileRoute('/blog/')({
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<div
			className={css({
				maxW: '2xl',
				mx: 'auto',
				px: { base: 4, md: 6, lg: 8 },
			})}
		>
			<div
				className={css({
					py: 12,
					borderBottomWidth: 1,
					borderColor: 'neutral.200',
				})}
			>
				<h1
					className={css({
						fontSize: '4xl',
						fontWeight: 900,
						lineHeight: 'tight',
					})}
				>
					From the blog
				</h1>
				<p className={css({ mt: 2, color: 'neutral.600' })}>
					Discover expert tips to grow your business!
				</p>
			</div>
			<ul className={css({ spaceY: 12, mt: 12 })}>
				{allPosts.map((post) => (
					<li key={post.title}>
						<time className={css({ color: 'neutral.500' })}>
							{formatDate(post.publishedAt)}
						</time>
						<h3 className={css({ fontSize: 'lg', fontWeight: 600, my: 2 })}>
							<a
								href={`/blog/${post._meta.path}`}
								className={css({
									color: 'neutral.700',
									_hover: { color: 'neutral.500' },
								})}
							>
								{post.title}
							</a>
						</h3>
						<div className={css({ color: 'neutral.700' })}>{post.summary}</div>
					</li>
				))}
			</ul>
		</div>
	)
}
